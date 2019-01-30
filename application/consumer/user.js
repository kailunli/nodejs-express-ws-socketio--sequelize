'use strict'

class User {
    constructor() {
        this.q = 'test';
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

                        sockets[msgObj.socketid].emit('alert msg', {msg: msg.content.toString()})
                        // io.emit('alert msg', {msg: msg.content.toString()});
                    }
                });
            });
        }).catch(console.warn)
    }
}

module.exports = (()=>{
    return new User();
})();