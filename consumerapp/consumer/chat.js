'use strict'

class Chat {
    constructor() {
    }

    run(io) {
        this.testDemo(io);
    }

    testDemo(io) {
        let queue = helper.getQueue("test demo");
        let emiter = helper.getEmiter("test demo");
        rabbitamqp.consumer(queue.name, function (content) {
            if (content != null) {
                let message = content.content.toString();
                let sockets = io.sockets.sockets;
                let msgObj = JSON.parse(message);
                msgObj["consume_time"] = (new Date()).getTime();

                //sockets[msgObj.socketid].emit(emiters["public chat"], message)
                io.emit(emiter.name, msgObj);
            }
        });
    }

    publicChat(io) {
        let queue = helper.getQueue("public chat");
        let emiter = helper.getEmiter("public chat");
        // 公聊队列
        rabbitamqp.consumer(queue.name, function (content) {
            if (content != null) {
                let message = content.content.toString();
                let sockets = io.sockets.sockets;
                let msgObj = JSON.parse(message);
                msgObj["consume_time"] = (new Date()).getTime();

                //sockets[msgObj.socketid].emit(emiters["public chat"], message)
                io.emit(emiter.name, msgObj);
            }
        });
    }

    privateChat(io) {
        let queue = helper.getQueue("private chat");
        let emiter = helper.getEmiter("private chat");
        // 私聊队列
        rabbitamqp.consumer(queue.name, function (content) {
            if (content != null) {
                let message = content.content.toString();
                let sockets = io.sockets.sockets;
                let msgObj = JSON.parse(message);
                msgObj["consume_time"] = (new Date()).getTime();

                //sockets[msgObj.socketid].emit(emiters["public chat"], message)
                io.emit(emiter.name, msgObj);
            }
        });
    }
}

module.exports = (()=>{
    return new Chat();
})();