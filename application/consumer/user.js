'use strict'

class User {
    constructor() {
    }

    run(io) {
        let $this = this;
        /*amqp.then(function (conn) {
            return conn.createChannel();
        }).then(function (ch) {
            return ch.assertQueue("chat").then(function (ok) {
                return ch.consume("chat", function (msg) {
                    if (msg != null) {
                        ch.ack(msg);

                        let sockets = io.sockets.sockets;
                        let msgObj = JSON.parse(msg.content.toString());
                        msgObj["consume_time"] = (new Date()).getTime();

                        //sockets[msgObj.socketid].emit(emiters["public chat"], msg.content.toString())
                        io.emit(emiters["public chat"].name, msgObj);

                        // helper.writeFile('./test_data.txt', JSON.stringify(msgObj) + "\r\n");
                    }
                });
            });
        }).catch(console.warn)*/

        rabbitamqp.consume("private chat", function (content) {
            if (content != null) {
                let message = content.content.toString();
                let sockets = io.sockets.sockets;
                let msgObj = JSON.parse(message);
                msgObj["consume_time"] = (new Date()).getTime();

                //sockets[msgObj.socketid].emit(emiters["public chat"], message)
                io.emit(emiters["public chat"].name, msgObj);

                // helper.writeFile('./test_data.txt', JSON.stringify(msgObj) + "\r\n");
            }
        });
    }
}

module.exports = (()=>{
    return new User();
})();