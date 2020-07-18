const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'xxxxxxxx',
    port: '3306',
    user: 'xxxxx',
    password: 'xxxxx',
    supportBigNumbers: 20,
    bigNumberStrings: 20,
    multipleStatements: true,
  },
  pool: { min: 0, max: 20 },
  debug: false
});

function queryUserInfo(dbName, page, pageSize) {
  const sql = knex.withSchema(dbName).select('*').from('Member')
    .limit(pageSize).offset(pageSize * (page - 1)).where('memberStatus', 1)
  console.log(sql.toString())
  return sql
}

function countMember(dbName) {
  const sql = knex.withSchema(dbName).count('* as count').table('Member').where('memberStatus', 1)
  console.log(sql.toString())
  return sql
}

module.exports = {
  queryUserInfo,
  countMember
}