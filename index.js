'use strict'

const express = require('express');
global.app = express();
global.http = require('http').Server(app);

app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// 设置静态文件目录：使用静态文件必要条件
app.use(express.static(__dirname + "/static/"));

global.io = require('socket.io')(http);
global.path = require("path");
global.url = require("url");
global.querystring = require("querystring");

// socket.io-redis 该模块通过Redis订阅/发布（SUBSCRIBE/PUBLISH）机制实现(包含多服务器)多进程共享数据和通信。非开发人员代码操作redis服务
global.redisConf = require('./application/redis');
io.adapter(require('socket.io-redis')({
    host: redisConf.host,
    port: redisConf.port,
    password: redisConf.auth
}));

// ioredis 开发人员代码操作使用的redis服务
const Redis = require("ioredis");
global.redis = new Redis({
    host: redisConf.host,
    port: redisConf.port,
    password: redisConf.auth
});

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

app.get('/', function(req, res){
    let params = url.parse(req.url, true).query;

    // res.send(params);
    // res.send('<h1>Hello World</h1>');
    res.sendFile(__dirname + "/index.html");
    // res.render('index', {message: 'hello word'});
});

// socket 具体操作
let chat = require('./wschat');


require('require-all')({
    dirname: __dirname + '/application/router'
});

http.listen(3000, function(){
    console.log('listening on *:3000.');
});