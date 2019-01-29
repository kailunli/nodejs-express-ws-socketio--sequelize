'use strict'

const express = require('express');
global.app = express();
global.http = require('http').Server(app);

app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// 设置今天文件目录：使用静态文件必要条件
app.use(express.static(__dirname + "/static/"));

global.io = require('socket.io')(http);
global.path = require("path");
global.url = require("url");
global.querystring = require("querystring");

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

/*app.get('/user', async function(req, res){
    let querys = url.parse(req.url, true).query;
    // res.send(querys);

    let UserModel = require('./application/model/user');
    let user = await UserModel.model().findByPk(1).then(user=>{
        return user;
    });
    res.send(user);

    let users = UserModel.model().findAll({
        where: {
            userid: {
                [Sequelize.Op.gte]: 3
            }
        }
    }).then(users=>{
        return users;
    });
    res.send(users);
});*/

// socket 具体操作
let chat = require('./wschat');

// let test = require('./application/router/user');

require('require-all')({
    dirname: __dirname + '/application/router'
});

http.listen(3000, function(){
    console.log('listening on *:3000.');
});