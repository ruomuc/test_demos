const io = require('socket.io-client');
const cout = process.stdout;
const cin = process.stdin;
const colors = require("colors")

const IP = '127.0.0.1';
const PORT = 3333;
var socket = null;

socket = io(`http://${IP}:${PORT}`);

//定义一个状态吧
var state = null;

//socket监听
socket.on('connect', data => {
  //输入昵称的状态
  state = 'nicking';
  // cout.write(`请输入您的昵称(按enter键结束):\r\n`);
  console.log(`请输入您的昵称(按enter键结束):\r\n`.rainbow);
})

socket.on('disconnect', data => {
  cout.write(`服务器断开连接\r\n`);
})

socket.on('login_false', data => {
  state = 'nicking';
  if (data == 1) {
    console.log(`昵称不能为空\r\n`.red);
  } else if (data == 2) {
    console.log(`昵称已经被用了哦,请重新输入\r\n`.red);
  }
})

socket.on('login_result', data => {
  var data = JSON.parse(data);
  var rooms = data.rooms;
  if (rooms.length == 0) {
    state = 'creating';
    // cout.write(`没有聊天室,是否创建聊天室y/n\r\n`);
    console.log(`没有聊天室,是否创建聊天室y/n\r\n`.red);
  } else {
    let str = `请输入序号进入聊天室:\r\n`;
    rooms.forEach((element, index, arr) => {
      str += `———` + (index + 1) + `  ` + element.name + `\r\n`;
    });
    str += `——— 0  创建新的聊天室\r\n`;
    cout.write(str);
    state = 'entering';
  }
})

socket.on('create_result', data => {
  var data = JSON.parse(data);
  var rooms = data.rooms;

  if (rooms.length != 0) {
    let str = `请输入序号进入聊天室:\r\n`;
    rooms.forEach((element, index, arr) => {
      str += (index + 1) + `  ` + element.name + `\r\n`;
    });
    str += `0  创建新的聊天室\r\n`;
    cout.write(str);
    state = 'entering';
  }
})

socket.on('chat', data => {
  var data = JSON.parse(data);

  var sender = data.name;
  var message = data.message;
  if (sender != null) {
    //是用户发的消息
    // cout.write(sender + `说` + message + `\r\n`);
    console.log(`${sender}说: ${message}\r\n`.green);
  } else {
    //系统发的
    // cout.write(`广播:` + message + `\r\n`);
    console.log(`广播:${message}\r\n`.rainbow);
  }
  state = 'chatting';
})

//监听命令行输入
cin.on('data', (chunk) => {
  if (chunk.toString() != '\r\n') {

    if (socket == null) {
      //如果没有连接，则创建连接
      socket = io(`http://${IP}:${PORT}`);
    } else {
      //正常的输入
      var msg = (chunk + '').replace(/[\r\n]/ig, "");

      //如果输入是exit或quit则断开连接并退出
      if (msg.toLowerCase() == 'exit' || msg.toLowerCase() == 'quit') {
        socket.disconnect();
        cin.end();
        return;
      }
      //处理信息
      dealMsg(msg);
    }
  } else {
    //不能输入空
    cout.write('请重新输入：');
  }
});

function dealMsg(msg) {
  if (state == 'nicking') {
    socket.emit('login', JSON.stringify({ nick: msg }));
  } else if (state == 'creating') {
    if (msg.toLowerCase() == 'y') {
      socket.emit('creatRoom');
    } else {

    }
  } else if (state == 'entering') {
    var cNum = parseInt(msg);
    if (cNum == 0) {
      socket.emit('creatRoom');
    } else {
      socket.emit('enterRoom', JSON.stringify({ cNum: cNum - 1 }));
    }
  } else if (state == 'chatting') {
    // cout.write(`你说:${msg}\r\n`);
    console.log(`你说: ${msg}\r\n`.yellow);
    socket.emit('chat', JSON.stringify({ message: msg }));
  }
}