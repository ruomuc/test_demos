const http = require('http');
console.log(process.env.HOME);
http.createServer(function (req, res) {
	heapOut();
  res.end('hello from alinode docker!\n');
}).listen(7001);


function heapOut(){
	let array = [];
	setInterval(function(){
		array.push(1);
		console.log(array.length);
	},10)
}