'use strict'

const express = require('express');
global.app = express();
const server = require('http').Server(app);
// socket.io
global.io = require('socket.io')(server);

app.set('views', './views');
app.set('view engine', 'jade');
// app.engine('jade', require('jade').__express); // 使用jade模板引擎
app.use(express.static(__dirname + "/static/")); // // 设置静态文件目录：使静态文件可用的必要条件

// 测试类
global.test = require('./application/test');
// 公共函数类
global.helper = require('./application/common/helper');
// emiter 事件 配置
global.emiters = require('./application/emiter');
// 消息队列
global.queues = require('./application/queue').queue;
// redis 模块
global.redis = require('./extend/redis');
// mongo模块 普通操作
global.mongo = require('./extend/mongo');
// mongoose模块 ORM操作
global.mongoose = require('./mongoose/mongoose');
// rabbitmq 模块
global.rabbitamqp = require('./extend/rabbitmq');
// 消费者
let consumer = require('./consumerapp/autoload').run(io);
// 数据库操作模块
const database = require('./application/database');
global.Sequelize = require('sequelize');
global.sequelize = global.db = new Sequelize(database.database, database.username, database.password, {
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

/*server.listen(3000, function(){
    console.log('listening on *:3000.');
});*/

// https://www.npmjs.com/package/sticky-session
/**
 *  在启动服务时进行操作，cpu的每个核（处理器）都会进行操作
 *  在启动服务之后进行操作，cpu只会有一个核（处理器）进行操作
 */
// Cluster is an extensible multi-core server manager for node.js. 【Cluster是node.js的可扩展多核服务器管理器。】
const cluster = require('cluster'); // Only required if you want the worker id
// A simple performant way to use socket.io with a cluster. 【将socket.io与集群一起使用的简单高效方法。】
const sticky = require('sticky-session');

let port = 3000;
if (!sticky.listen(server, port)) {
    // Master code
    server.once('listening', function() {
        console.log('server started on port '+ port +'!');
    });
} else {
    console.log('worker started on work id ' + cluster.worker.id + ' and pid ' + cluster.worker.process.pid + '.');
}