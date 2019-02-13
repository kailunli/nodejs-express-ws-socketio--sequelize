'use strict'

const amqpConf = require('./amqp_conf');

class RabbitAmqp {
    constructor() {
    }

    async produce(queue, exchange, exchangeType="fanout", content="") {
        let conn = await require('amqplib').connect(amqpConf.host).then(function (conn) {
            return conn;
        });
        let channel = await conn.createChannel();
        try {
            channel.setMaxListeners(0);

            if (queue && typeof queue == "string") {
                await channel.assertQueue(queue);
            }

            if (exchange && typeof exchange == "string") {
                await channel.assertExchange(exchange, exchangeType);
                channel.bindQueue(queue, exchange);
                channel.publish(exchange, queue, content);
            } else {
                channel.sendToQueue(queue, content);
            }
        } catch (e) {
            channel.close();
        }
    }

    async consume(queue, callback, prefetchCount=1, global=true) {
        let conn = await require('amqplib').connect(amqpConf.host).then(function (conn) {
            return conn;
        });
        let channel = await conn.createChannel();
        try {
            channel.prefetch(prefetchCount, global); // global true:连接共享  false:信道共享
            channel.assertQueue(queue);
            channel.consume(queue, async (content) => {
                if (content) {
                    try {
                        if (typeof callback == "function") {
                            await callback(content);
                        }
                    } catch (e) {

                    }
                    channel.ack(content);
                }
            });
        } catch (e) {
            
        }
    }
}

module.exports = (()=> {
    return new RabbitAmqp();
})();