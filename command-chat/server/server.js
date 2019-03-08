const net = require('net');
const server = net.createServer();
const PORT = 7000;
const HOST = '127.0.0.1';

// console.log('xx', net, server);

const userList = {};//用户连接池

var client = null;//当前连接

server.on('connection', socket => {
    console.log('connection', socket);
    let isOnline = true;
    socket.on('end', () => {
        console.log(`client disconnected.\n\r`);
        socket.destroy();
    });

    socket.on('error', (error) => {
        console.log(error.message);
    });

    socket.on('data', (chunk) => {
        client = socket;
        var msg = JSON.parse(chunk.toString());
        if (msg.cmd == 'keep') {
            isOnline = true;
            return;
        }
    });

});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log(`listening on ${server.address().address}:${server.address().port}\n\r`);
});

server.listen(PORT, HOST);
