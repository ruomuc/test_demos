var qiniu = require('qiniu')

var accessKey = 'j9ecFQIDljKu0cdyiK-JhwbWO83zWmunV4U2gEXG';
var secretKey = 'PwhV2vAhhYP4C0emst7SfO8hDBRAmMWZpq7-NG3M';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);
var publicBucketDomain = 'http://if-pbl.qiniudn.com';//测试域名被收回就没有这个链接了
// 公开空间访问链接
var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
console.log(publicDownloadUrl);