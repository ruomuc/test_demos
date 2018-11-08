var tls = require('tls');
var fs = require('fs');
console.log('1');
var options = {
    key: fs.readFileSync('./keys/client.key'),
    cert: fs.readFileSync('./keys/client.crt'),
    ca: [fs.readFileSync('./keys/ca.crt')]
}
console.log('2',options);

var stream = tls.connect(8000, options, function () {
    console.log('client connected ', stream.authorized ? 'authorized' : 'unauthorized');

    process.stdin.pipe(stream);
})
console.log('3');

stream.setEncoding('utf8');
console.log('4');


stream.on('data', function (data) {
    console.log(data);
})
console.log('5');

stream.on('end', function () {
    server.close();
})
console.log('6');
