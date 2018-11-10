var mysql = require("mysql");

var config = {
    HOST: 'localhost',
    USER: 'root',
    PSWD: 'root',
    DB: 'yqqp',
    PORT: 3306,
};

var pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PSWD,
    database: config.DB,
    port: config.PORT,
});

function query(sql, more, affect) {
	return new Promise(function(resolve, reject) {
	    pool.getConnection(function (err, conn) {
	        if (err) {
	            console.log("[Error] sql:", sql);
	            reject(err, null, null);
	        } else {
	            console.log("[Info.] sql:", sql);
	            conn.query(sql, function (qerr, rows, fields) {
	                //释放连接
	                conn.release();
	                //事件驱动回调

	                if(qerr){
	                	console.log("!!!!!!error", qerr);
	                }
	                resolve(rows);
	            });
	        }
	    });
	});
};

function doSync(gen){
	var g = gen();
	function next(data){
		var result = g.next(data);
		if (result.done) return result.value;
			result.value.then(function(data){
			next(data);
		});
	}
	next();
}

// -------------------------------------------------

exports.get_users = function() {
	var sql = "SELECT * FROM t_users WHERE userid=104087";

	return query(sql);
}
exports.update = function() {
	var sql = "INSERT INTO t_bank(userid,createTime,coins) VALUES(123563,1535940926,100)";

	return query(sql);
}
exports.delete = function() {
	var sql = "delete FROM t_bank WHERE userid = 123563";

	return query(sql);
}


doSync(function*(){
	var rows = yield exports.get_users();
	console.log("1111", rows);

	var x = yield exports.update();
	console.log("2222", x);

	var y = yield exports.delete();
	console.log("333", y);
});
