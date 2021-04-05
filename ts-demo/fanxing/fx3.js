function identify(arg) {
    return arg;
}
var myIdentify = identify;
console.log(typeof myIdentify(1));
console.log(typeof myIdentify('aaa'));
