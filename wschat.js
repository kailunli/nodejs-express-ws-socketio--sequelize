'use strict'

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
        } else {
            socket.emit("alert msg", {msg: "用户ID不存在！"});
            return ;
        }

        // 用户不存在
        if (JSON.stringify(userInfo) == '{}') { // JSON对象判断值是否相等
            socket.emit("alert msg", {msg: "用户ID="+ userid +"不存在！"});
            return ;
        }

        // 加入房间
        socket.join(roomName, ()=>{
            let rooms = Object.keys(socket.rooms);
            let msg = "新用户“" + userInfo[0]['username'] + "”加入房间！";
            io.to(roomName).emit('alert msg', {userid: userid, msg: msg}); // 不会将消息发送给房间中除发送者的所有人
            // io.in(roomName).emit('alert msg', {msg: msg}); // 会将消息发送给该房间中的所有人

            funcs.writeFile("./test_data.txt", msg + "\r\n");
        });

        io.emit('chat', userInfo[0]);
    });
});