// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200' })
// const client = new Client({ node: 'http://192.168.110.155:9200' })

// client.count({
//   index: 'member_1234567890',
// })
//   .then(result => {
//     console.log(result.body)
//   })

// client.index({
//   index: 'game-of-thrones',
//   type: 'game',
//   id: '12121',
//   body: {
//     character: 'Arya Stark',
//     quote: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
//     house: 'sdaf1'
//   }
// })
// let a = '刘*'
// console.log(new RegExp(`/${a}/`))
// client.search({
//   index: 'game-of-thrones'
// })
//   .then(result => {
//     console.log(result.body.hits)
//   })

// const a = 'member_1234567890'
// const keywords = '13560978414'
// client.sql.query({
//   body: {
//     // query: `SELECT cardNum FROM "${a}" where (name like '${keywords}%' or cardNum like '${keywords}%' or phone like '${keywords}%') `
//     query: `SELECT * FROM "${a}" where mobile = ${keywords}`,
//     // query: `SELECT cardNum FROM "${a}" limit 10`,
//   }
// })
//   .then(result => {
//     console.log(result.body)
//   })


// client.search({
//   index: 'member_1234567890',
//   size: '10'
// })
//   .then(result => {
//     console.log(result.body.hits.hits)
//   })

// client.count({
//   index: 'member_1234567890'
// }).then(result => {
//   console.log(result.body)
// })

// client.scroll({
//   scroll: '30s',
//   scroll_id: 'FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFDlrd0RwM0lCZ2h3eFp6MzRscE1UAAAAAAAA0JgWUXQ2M0I5QXdSRi1pWTlRX2NZUDMzdw==',
//   rest_total_hits_as_int: true
// })
//   .then(result => {
//     console.log(result.body)
//   })

// es.scrollData('FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFFRrd0hwM0lCZ2h3eFp6MzRMNVNTAAAAAAAA0PAWUXQ2M0I5QXdSRi1pWTlRX2NZUDMzdw==', '30s')
//   .then(result => {
//     console.log(result)
//   })

// client.count({
//   index: 'member_1234567890',
//   body: {
//     query: {
//       multi_match: {
//         fields: ['name', 'phone', 'cardNum'],
//         query: '王',
//         fuzziness: 'AUTO'
//       }
//     }
//   }
// })
//   .then(result => {
//     console.log(result)
//   })

// client.search({
//   index: 'member_1234567890',
//   body: {
//     query: {
//       // multi_match: {
//       //   fields: ['cardNum.keywords'],
//       //   // query: '5eb9a17b-d03e-4702-8314-522e6569bc7d',
//       //   query: '00000002',
//       //   fuzziness: 'AUTO'
//       // }
//       match: {
//         cardNum: '00000002'
//       }
//     }
//   }
// })
//   .then(result => {
//     // console.log(result)
//     console.log(result.body.hits.hits)
//   })

// client.indices.create({
//   index: 'member_1234567890',
//   body: {
//     mappings: {
//       properties: {
//         cardNum: {
//           type: 'keyword'
//         },
//         phone: {
//           type: 'keyword'
//         },
//         name: {
//           type: 'keyword'
//         },
//         address: {
//           type: 'text'
//         }
//       }
//     }
//   }
// })
//   .then(result => {
//     console.log(result)
//   })

// client.search({
//   index: 'member_1234567890',
//   body: {
//     "query": {
//       "match": {
//         "cardNum.keywords": "5eb9a17b-d03e-4702-8314-522e6569bc7d"
//       }
//     }
//   }
// })
//   .then(result => {
//     console.log(result.body.hits.hits)
//   })

// client.index({
//   index: 'game-of-thrones',
//   id: '12121',
//   body: {
//     "character": "522e6569bc7d",
//     "quote": "13511602568",
//     "house": "鑫龙花园3号楼1单元***"
//   }
// })

// client.bulk({
//   body: [
//     { index: { _index: 'game-of-thrones', _id: '12121' } },
//     {
//       character: 'a',
//       quote: 'b'
//     },
//     { index: { _index: 'game-of-thrones', _id: 'sGtnIBYqbqJI8HqWX4' } },
//     {
//       character: 'aaa',
//       quote: 'bbbb'
//     }
//   ]
// })

// client.search({
//   index: 'game-of-thrones',
//   _source:['quote']
// })
//   .then(result => {
//     console.log(result.body.hits.hits)
//     console.log(_.map(_.map(result.body.hits.hits, '_source'), 'quote'))
//   })


// client.bulk({
//   body: [{
//     "index": {
//       "_index": "member_0123456789",
//       "_type": "doc"
//     }
//   },
//   {
//     "cardNum": "00018911",
//     "phone": "13541349086",
//     "name": "孙**",
//     "address": "郑州市中原区中原西路**"
//   },
//   {
//     "index": {
//       "_index": "member_0123456789",
//       "_type": "doc"
//     }
//   },
//   {
//     "cardNum": "160000972",
//     "phone": "13550324359",
//     "name": "k*",
//     "address": ""
//   },
//   {
//     "index": {
//       "_index": "member_0123456789",
//       "_type": "doc"
//     }
//   },
//   {
//     "cardNum": "160000974",
//     "phone": "13545112300",
//     "name": "李**",
//     "address": "河南省 平顶山市  ******"
//   }]
// })

// client.search({
//   index: 'member_1234567890',
//   // keep the search results "scrollable" for 30 seconds
//   scroll: '30s',
//   // for the sake of this example, we will get only one result per search
//   size: 10,
//   // filter the source to only include the quote field
//   _source: ['cardNum', 'phone', 'name'],
//   body: {
//     query: {
//       bool: {
//         should: [
//           {
//             wildcard: {
//               cardNum: '131*'
//             }
//           },
//           {
//             wildcard: {
//               phone: '131*'
//             }
//           },
//           {
//             wildcard: {
//               name: '131*'
//             }
//           }
//         ]
//       }
//       // wildcard: {
//       //   cardNum: '5eb9a17b*',
//       // }
//     }
//   }
// })
//   .then(result => {
//     console.log(result.body.hits.hits)
//   })

// client.bulk(
//   {
//     body: [{ index: { _index: 'member_0123456789', _id: '160067343' } },
//     {
//       cardNum: '160067343',
//       mobile: '13568869830',
//       nickName: '王**',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067345' } },
//     {
//       cardNum: '160067345',
//       mobile: '13525440349',
//       nickName: '陈*',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067346' } },
//     {
//       cardNum: '160067346',
//       mobile: '13520592260',
//       nickName: '周**',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067350' } },
//     {
//       cardNum: '160067350',
//       mobile: '13577201777',
//       nickName: '栗**',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067351' } },
//     {
//       cardNum: '160067351',
//       mobile: '13571735363',
//       nickName: '杨**',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067347' } },
//     {
//       cardNum: '160067347',
//       mobile: '13526640257',
//       nickName: '胡*',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067349' } },
//     {
//       cardNum: '160067349',
//       mobile: '13571424509',
//       nickName: '董**',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067352' } },
//     {
//       cardNum: '160067352',
//       mobile: '13527071486',
//       nickName: '郭**',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067353' } },
//     {
//       cardNum: '160067353',
//       mobile: '13520151345',
//       nickName: '王**',
//       address: ''
//     },
//     { index: { _index: 'member_0123456789', _id: '160067354' } },
//     {
//       cardNum: '160067354',
//       mobile: '13519542272',
//       nickName: '将',
//       address: '鑫隆'
//     }]
//   })


// function getDataByPage(index, source, scroll, body, page, pageSize) {
//   const searchDataScrollPromise = es.searchDataScroll(index, scroll, pageSize, source, body)
//   if (Number(page) === 1) {
//     return searchDataScrollPromise
//   } else {
//     return searchDataScrollPromise
//       .then(result => {
//         console.log(result.body._scroll_id)
//         return recurseScroll(result.body._scroll_id, scroll, page)
//       })
//   }
// }

// getDataByPage('member_0123456789', ['cardNum', 'mobile', 'nickName'], '30s', {
//   query: {
//     bool: {
//       should: [
//         {
//           wildcard: {
//             cardNum: '131*'
//           }
//         },
//         {
//           wildcard: {
//             phone: '131*'
//           }
//         },
//         {
//           wildcard: {
//             name: '131*'
//           }
//         }
//       ]
//     }
//   },
//   sort: { cardNum: { order: 'asc' } }
// }, 100, 10000)
//   .then(result => {
//     console.log(result.body.hits.hits)
//   })

// function recurseScroll(scrollId, scroll, page) {
//   return es.scrollData(scrollId, scroll)
//     .then(result => {
//       page--;
//       console.log('page=', page)
//       if (page > 0) {
//         return recurseScroll(result.body._scroll_id, scroll, page)
//       } else {
//         return result
//       }
//     })
// }

// const keywords = '130'
// client.search({
//   index: 'member_12345678900',
//   size: 10,
//   from: 0,
//   body: {
//     sort: { cardNum: { order: 'asc' } },
//     query: {
//       bool: {
//         must: [
//           { term: { status: 1 } },
//           {
//             bool: {
//               should: [
//                 {
//                   wildcard: {
//                     cardNum: `${keywords}*`
//                   }
//                 },
//                 {
//                   wildcard: {
//                     mobile: `${keywords}*`
//                   }
//                 },
//                 {
//                   wildcard: {
//                     nickName: `${keywords}*`
//                   }
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   }
// }).then(result => {
//   console.log(result.body.hits.hits)
// })


var elasticsearch = require('elasticsearch');
const { result } = require('lodash');
var client = new elasticsearch.Client({
  // host: 'localhost:9200',192.168.110.155:9200
  host: '192.168.110.155:9200',
  apiVersion: '7.7', // use the same version of your Elasticsearch instance
});

client.search({
  index: 'member_1234567890',
  body: {

  }
})
.then(result=>{
  console.log(result.hits.hits)
})