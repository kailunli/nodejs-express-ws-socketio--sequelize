'use strict'

const express = require('express');
global.app = express();
const http = require('http').Server(app);
// socket.io
global.io = require('socket.io')(http);

app.set('views', './views');
app.set('view engine', 'jade');
// app.engine('jade', require('jade').__express); // 使用jade模板引擎
app.use(express.static(__dirname + "/static/")); // // 设置静态文件目录：使用静态文件必要条件

// 测试类
global.test = require('./application/test');
// 公共函数类
global.helper = require('./application/common/helper');
// emiter 事件 配置
global.emiters = require('./application/emiter');
// redis 模块
global.redis = require('./redis');
// rabbitmq 模块
global.amqp = require('./amqp');
// 数据库操作模块
const database = require('./application/database');
global.Sequelize = require('sequelize');
global.sequelize = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.dialect,
    operatorsAliases: database.operatorsAliases,
    pool: database.pool
});

// socket 具体操作
const wschat = require('./wschat');

// express 路由
let routers = require('require-all')({
    dirname: __dirname + '/application/router'
});

http.listen(3000, function(){
    console.log('listening on *:3000.');
});