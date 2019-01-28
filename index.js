'use strict'

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// 设置今天文件目录：使用静态文件必要条件
app.use(express.static(__dirname + "/static/"));

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

app.get('/layuicss', function(req, res) {
    let fs = require("fs")
    let mime = require("mime");

    fs.readFile("./static/layui-2.4.5/css/layui.css", "utf-8", function(err, data) {
        res.writeHead(200, {"content-type":"text/css;charset=utf-8;"});
        res.write(data);
        res.end();
    });
});

app.get('/layuijs', function(req, res) {
    let fs = require("fs")
    let mime = require("mime");

    fs.readFile("./static/layui-2.4.5/layui.js", "utf-8", function(err, data) {
        res.writeHead(200, {"content-type":"text/javascript;charset=utf-8;"});
        res.write(data);
        res.end();
    });
});

app.get('/user', async function(req, res){
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


});

// io 监听连接
io.on('connection', async function(socket) {

    // test.testDbConnect(); // 测试数据库连接是否成功

    // 注册
    socket.on('register', function(msg){
        let User = require('./application/controller/user');
        let regRes = User.register(msg.username);
        io.emit('register', regRes);
    });

    // 聊天
    socket.on('chat', async (msg) => {
        let userid = msg.hasOwnProperty('userid') ? msg.userid : 0;
        let roomid = msg.hasOwnProperty('roomid') ? msg.roomid : 0;

        let roomName = "lkl_room_" + roomid.toString();

        let userInfo = {};
        if (userid > 0) {
            let userServ = require('./application/service/user');
            userInfo = await userServ.getUser(userid);
        }

        // 加入房间
        socket.join(roomName, ()=>{
            let rooms = Object.keys(socket.rooms);
            io.to(roomName).emit('alert msg', {msg:"新用户“" + userInfo[0]['username'] + "”加入房间！"});
        });

        // io.emit('chat', userInfo[0]);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000.');
});