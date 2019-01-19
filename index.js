'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
	// res.send('<h1>Hello World</h1>');
	res.sendFile(__dirname + "/index.html");
    //(()=>{
        //let querys = url.parse(req.url, true).query;

    //})();
});

app.get('/user', async function(req, res){
    let querys = url.parse(req.url, true).query;
    // res.send(querys);

    let UserModel = require('./application/model/user');
    /*let user = await UserModel.model().findByPk(1).then(user=>{
        return user;
    });
    res.send(user);*/

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


});

// io 监听连接
io.on('connection', async function(socket){

    // test.testDbConnect(); // 测试数据库连接是否成功

    socket.on('register', function(msg){
        let User = require('./application/controller/user');
        let regRes = User.register(msg.username);

        io.emit('register', regRes);
    });
});

http.listen(3000, function(){
	console.log('listening on *:3000.');
});