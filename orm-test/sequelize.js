const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'rootroot', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: false,
  timezone: '+08:00', // 时区，中国+8
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
    .authenticate()
    .then(() => {
      console.log('***数据库连接成功');
    })
    .catch(err => {
      console.error('数据库连接失败：', err);
    });
