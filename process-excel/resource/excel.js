const fs = require("fs");
const path = require('path')
const homedir = require('os').homedir()
const XLSX = require('xlsx')
const _ = require('lodash');

async function processExcel(fieldData, sourceFile, targetName) {
  // 源文件路径
  const sourcePath = path.resolve(homedir, sourceFile);
  // 拿到后缀
  const suffix = sourceFile.split('.').slice(-1)[0];
  // 输出文件路径
  const targetFile = path.resolve(homedir, `${targetName}.${suffix}`);
  // 获取工作簿
  console.log(sourcePath, suffix, targetFile);
  const buf = fs.readFileSync(sourcePath);
  const wb = XLSX.read(buf, { type: 'buffer' });
  const data = dealWithCondition(wb, fieldData);
  console.log('data', data);
  if (_.isEmpty(data)) {
    return Promise.reject('筛选后为空!');
  }
  wb.Sheets.Sheet1 = XLSX.utils.json_to_sheet(data);
  await XLSX.writeFile(wb, targetFile);
}

/**
 * 处理数据
 * @param {*} fieldData 
 * @param {*} logic 
 */
function dealWithCondition(wb, fieldData) {
  // 先支持单个sheet吧
  const sheetJson = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1);
  const newSheetJson = _.compact(_.map(sheetJson, item => {
    // 满足逻辑运算的，返回
    if (checkLogic(item, fieldData)) {
      return item;
    }
  }))
  return newSheetJson;
}

function checkLogic(target, fieldData) {
  console.log('checkLogic', target, fieldData);
  let flag = true;
  _.forEach(fieldData, v => {
    if (v.operation === '>') {
      if (target[v.name] <= v.value) {
        flag = false;
      }
    }
    if (v.operation === '=') {
      if (target[v.name] != v.value) {
        flag = false;
      }
    }
    if (v.operation === '<') {
      if (target[v.name] >= v.value) {
        flag = false;
      }
    }
    if (v.operation === '>=') {
      if (target[v.name] < v.value) {
        flag = false;
      }
    }
    if (v.operation === '<=') {
      if (target[v.name] > v.value) {
        flag = false;
      }
    }
    if (v.operation === '!=') {
      if (target[v.name] == v.value) {
        flag = false;
      }
    }
  })
  console.log(flag);
  return flag;
}

module.exports = {
  processExcel
}


processExcel([{ value: 12, name: '金额', operation: '>' }], '测试.xlsx', '测试222')