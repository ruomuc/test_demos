var cmd = require('node-cmd');
var fs = require('fs');

var user = 'xxx';
var pwsd = 'xxx';

cmd.run('qrsctl-v3.2.20170501 login ' + user + " " + pwsd);

cmd.get('qrsctl-v3.2.20170501 buckets', function (err, data, stderr) {
    console.log('result:', err, data, stderr, typeof data);
    var regexp = new RegExp(' ', 'g');
    data = data.replace(regexp, '","');
    data = data.replace("[", '["');
    data = data.replace("]", '"]');
    data = JSON.parse(data);
    console.log(data[0]);

    for (let i = 0; i < data.length; ++i) {
        console.log('aaa', data[i], 'qrsctl-v3.2.20170501 listprefix ' + data[i] + ' "" ');
        var bucket = data[i];
        (function(bucket){
            cmd.get("qrsctl-v3.2.20170501 listprefix " + data[i] + " '' ", function (err, data, stderr) {
                console.log('result2:', data, bucket);
                //不知道为什么这里的列表显示不出来，但是控制台可以，所以这里手动执行上面输出的命令复制粘贴一下了。
                fs.readFile('./temp.txt', 'utf-8', function (err, data) {
                    var regexp2 = new RegExp(/\s+/, 'g');
                    data = data.replace(regexp2, '","');
                    var newArr = JSON.parse('["' + data + '"]');
                    for (let j = 0; j < newArr.length; ++j) {
                        console.log("qrsctl-v3.2.20170501 get " + bucket + " " + newArr[j]);
                        cmd.run("qrsctl-v3.2.20170501 get " + bucket + " " + newArr[j]);
                    }
                })
            })
        })(bucket)
    }
})
