const { Client } = require('@elastic/elasticsearch');
const _ = require('lodash')
const client = new Client({ node: 'http://localhost:9200' })
const log = require('./log')

function searchData(index, body) {
  return client.search({ index, body })
}

function searchDataScroll(index, scroll, size, source, body) {
  return client.search({
    index,
    scroll,
    size,
    _source: source,
    body
  })
}

function scrollData(scrollId, scroll) {
  return client.scroll({
    scroll_id: scrollId,
    scroll,
    rest_total_hits_as_int: true
  })
}

/**
 * 使用bulk，新增数据
 * @param {*} data 
 * @param {*} index 
 * @param {*} customerId 
 */
function addData(data, index, customerId) {
  log.info('addData')
  let body = formatIndexBody(data, customerId, index)
  log.info('addData:', body)
  return client.bulk({ body })
}

/**
 * 获取索引下的数据总数
 * @param {*} index 
 */
function countAllByIndex(index) {
  return client.count({ index })
}

/**
 * 格式化bulk新增数据
 * @param {*} data 
 * @param {*} customerId 
 * @param {*} type 
 * @param {*} index
 */
function formatIndexBody(data, customerId, index) {
  return _.flatMap(data, item => [{ index: { _index: `${index}_${customerId}`, _id: item.cardNum } }, { cardNum: item.cardNum, mobile: item.phone, nickName: item.name, address: item.address }])
}

/**
 * 创建索引和mapping
 * @param {*} index 
 */
function createIndex(index) {
  client.indices.create({
    index: index,
    body: {
      mappings: {
        properties: {
          cardNum: {
            type: 'keyword'
          },
          mobile: {
            type: 'keyword'
          },
          nickName: {
            type: 'keyword'
          },
          address: {
            type: 'text'
          }
        }
      }
    }
  }, { ignore: [400] })
}

// createIndex('member_0123456789')
// countAllByIndex('member_0123456789')
//   .then(result => {
//     console.log(result)
//   })

module.exports = {
  searchData,
  addData,
  countAllByIndex,
  createIndex,
  searchDataScroll,
  scrollData
}