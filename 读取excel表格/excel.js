const fs = require('fs');
const xlsx = require('node-xlsx');

//文档路径
var filePath = './';
//文件保存路径
var savePath = ['./client/client-document.js', './server/server-document.js'];

console.log('__dirname', __dirname);

const workSheetsFromFile = xlsx.parse(`${__dirname}/Events.xls`);

const data_json = [];

var len = workSheetsFromFile.length;
// for (let i = 0; i < len; ++i) {
var wsfi = workSheetsFromFile[0]; //暂时只有sheet有数据，否则定义data_json1 和 data_json2 。
var sheet_name = wsfi.name;
console.log('sheet_name', sheet_name);

if (wsfi.data[0] != null) {
    //先循环标题，键
    var len2 = wsfi.data;

    var len4 = wsfi.data.length;
    console.log('len4', len4);
    for (let k = 0; k < len4; ++k) {
        if (k != 0) {//第一个数组已经被当做键了
            var obj = {};
            var wsfk = wsfi.data[k];
            var len5 = wsfk.length;
            console.log('len5', len5);
            for (let m = 0; m < len5; ++m) {
                var wsfm = wsfk[m];
                var wsfn = wsfi.data[0][m];

                obj[wsfn] = wsfm;
                if (m == len5 - 1) {
                    data_json.push(obj);
                }
            }
        }
    }
}
console.log('data_json', data_json, data_json.length);

for (let i = 0; i < savePath.length; ++i) {
    var path = savePath[i];
    if (i == 0) {
        var data = JSON.stringify(data_json);
        console.log('data1', data, path);
        fs.writeFileSync(path, data, { 'flag': 'w' });
    } else {
        var data = "module.exports.planConfig = " + JSON.stringify(data_json) + "";
        fs.writeFileSync(path, data, { 'flag': 'w' });
    }
}
// }