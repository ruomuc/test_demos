const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
var userLists = {};
var rooms = [];

const port = 3333;
httpServer.listen(port);
console.log(`socket is listen on ${port}`)

io.sockets.on('connection', socket => {
  console.log('connection success');
  userLists[socket.id] = {};
  //登录
  socket.on('login', data => {
    var data = JSON.parse(data);
    let result = checkNick(data.nick);
    if (result) {
      socket.emit('login_false', result);
      return;
    }
    socket.name = data.nick;
    userLists[socket.id]['name'] = data.nick;
    console.log('socket.name', socket.name);
    socket.emit('login_result', JSON.stringify({ rooms: rooms }));

  })

  socket.on('chat', data => {
    var data = JSON.parse(data);
    var message = data.message;
    console.log('message:', data, message);
    var roomId = userLists[socket.id]['roomId'];
    if (roomId == null) {
      console.log('err cant find room');
    }
    socket.to(roomId).emit('chat', JSON.stringify({ message: message, name: socket.name }));
  })

  //新建聊天室
  socket.on('creatRoom', data => {
    console.log('createroom', socket.name);
    var data = {
      name: `${socket.name}的聊天室`,
      roomId: socket.id,
      peopleNum: 0,
    }
    rooms.push(data);
    socket.emit('create_result', JSON.stringify({ rooms: rooms }));
  })
  //加入聊天室
  socket.on('enterRoom', data => {
    var data = JSON.parse(data);
    console.log('enterRoom', socket.name, rooms, data);
    var cNum = data.cNum;//序号换算到数组下标要减一
    var roomId = rooms[cNum].roomId;
    console.log('enterRoom 2', cNum, roomId);
    socket.join(roomId);
    userLists[socket.id]['roomId'] = roomId;
    rooms[cNum].peopleNum++;
    socket.to(roomId).emit('chat', JSON.stringify({ message: `欢迎${socket.name}加入聊天室,这里共有${rooms[cNum].peopleNum}个小朋友` }));
    //因为没法知道自己进来了，上面这个to方法没办法发给自己好像。。。我试了几个都不能发给自己
    socket.emit('chat', JSON.stringify({ message: `欢迎${socket.name}加入聊天室,这里共有${rooms[cNum].peopleNum}个小朋友` }));
    console.log('socket.room', socket.rooms);
  })


  socket.on('disconnect', data => {
    //退出要干些啥呢
    var roomId = userLists[socket.id]['roomId'];
    for (let [i, len] = [0, rooms.length]; i < len; ++i) {
      if (rooms[i].roomId == roomId) {
        rooms[i].peopleNum--;
      }
    }
    delete userLists[socket.id];
    console.log('disconnect!!', data);
  })
})

//获取在线人数
function getOnLines() {
  let count = 0;
  for (let i in userLists) {
    count++;
  }
  return count;
}

//检查名字是否重复
function checkNick(nick) {
  for (let i in userLists) {
    if (nick.toString() == "") {
      return 1;//为空
    }
    if (userLists[i]['name'] == nick) {
      return 2;//重复了
    }
  }
  return false;
}