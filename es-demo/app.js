const db = require('./db')
const es = require('./elasticsearch')
const _ = require('lodash')
const log = require('./log')

/**
 * 把数据数据导入es
 * @param {*} dbName 
 * @param {*} page 
 * @param {*} pageSize 
 * @param {*} count 
 */
function indexMemberToEs(dbName, page, pageSize, count) {
  console.log(`总共数${count}人`)
  // 如果上一片超出了count才结束
  while ((page - 1) * pageSize < count) {
    return db.queryUserInfo(dbName, page, pageSize)
      .then(userInfo => {
        if (_.isEmpty(userInfo)) {
          return;
        }
        return es.addData(userInfo, 'member', '0123456789')
      })
      .then(() => {
        page++;
        indexMemberToEs(dbName, page, pageSize, count)
      })
  }
}

/**
 * es索引间导数据
 * @param {*} index 
 * @param {*} customerId 
 * @param {*} scroll 
 * @param {*} size 
 * @param {*} source 
 * @param {*} body 
 */
function exportDataByPage(index, customerId, scroll, size, source, body) {
  return es.searchDataScroll('member_1234567890', scroll, size, source, body)
    .then(result => {
      return insertDataByScroll(index, customerId, result, scroll)
    })
}

function insertDataByScroll(index, customerId, result, scroll) {
  const { body: { _scroll_id: scrollId, hits: { hits: data } } } = result
  log.debug('scrollId=', scrollId)
  if (_.isEmpty(data)) {
    console.log('没有数据了，结束!')
    return
  }
  return es.addData(_.map(data, '_source'), index, customerId)
    .then(() => {
      log.info('scroll', scrollId, scroll)
      return es.scrollData(scrollId, scroll)
    })
    .then(result => {
      return insertDataByScroll(index, customerId, result, scroll)
    })
}

function main() {
  db.countMember('iCRM_CustomerDB_zzj2_test1')
    .then(result => {
      let page = 1;
      let pageSize = 1000;
      let count = result[0].count;
      return indexMemberToEs('iCRM_CustomerDB_zzj2_test1', page, pageSize, count)
    })
}

// main()
exportDataByPage('member', '0123456789', '30s', '10000', ['cardNum', 'name', 'phone', 'address'], {})

