'use strict'

class User {
    constructor() {
        this.q = 'chat';
    }

    run(io) {
        let $this = this;
        amqp.then(function (conn) {
            return conn.createChannel();
        }).then(function (ch) {
            return ch.assertQueue($this.q).then(function (ok) {
                return ch.consume($this.q, function (msg) {
                    if (msg != null) {
                        ch.ack(msg);

                        let sockets = io.sockets.sockets;
                        let msgObj = JSON.parse(msg.content.toString());
                        msgObj["consume_time"] = (new Date()).getTime();

                        //sockets[msgObj.socketid].emit(emiters["public chat"], msg.content.toString())
                        io.emit(emiters["public chat"], msgObj);

                        funcs.writeFile('./test_data.txt', JSON.stringify(msgObj) + "\r\n");
                    }
                });
            });
        }).catch(console.warn)
    }
}

module.exports = (()=>{
    return new User();
})();