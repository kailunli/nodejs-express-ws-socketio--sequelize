'use strict'

const express = require('express');
global.app = express();
global.http = require('http').Server(app);

app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// 设置静态文件目录：使用静态文件必要条件
app.use(express.static(__dirname + "/static/"));

// emiter 事件
global.emiters = require('./application/emiter');

global.io = require('socket.io')(http);
global.path = require("path");
global.url = require("url");
global.querystring = require("querystring");

global.redis = require('./redis');

// 测试类
global.test = require('./application/test');
// 公共函数类
global.funcs = require('./application/common/function');

global.database = require('./application/database');
global.Sequelize = require('sequelize');
global.sequelize = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.dialect,
    operatorsAliases: database.operatorsAliases,
    pool: database.pool
});

// rabbitmq
global.amqp = require('./amqp');

// socket 具体操作
let wschat = require('./wschat');

// test
require('./test');

require('require-all')({
    dirname: __dirname + '/application/router'
});

http.listen(3000, function(){
    console.log('listening on *:3000.');
});