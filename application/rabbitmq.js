'use strict'

const amqpConf = require('./amqp_conf');

class RabbitAmqp {
    constructor() {
        this.init();
    }

    // 初始化
    async init() {
        // this.conn = await require('amqplib').connect(amqpConf.host);
    }

    // 生产
    async produce(queue, content="", exchange="", exchangeType="fanout", routingkey="") {
        let conn = await require('amqplib').connect(amqpConf.host);
        let channel = await conn.createChannel();
        try {
            channel.setMaxListeners(0);

            if (queue && typeof queue == "string") {
                await channel.assertQueue(queue);
            }

            // 绑定Queue和Exchange
            if (routingkey && typeof routingkey == "string") { // 使用routingKey绑定
                await channel.assertExchange(exchange, exchangeType);
                channel.bindQueue(queue, exchange, routingkey);
                channel.publish(exchange, routingkey, content);
            } else { // routingkey不存在，直接声明Queue，然后发送消息到Queue即可
                channel.sendToQueue(queue, content);
            }
        } catch (e) {
            channel.close();
        }
    }

    // 消费
    async consume(queue, callback, prefetchCount=1, global=true) {
        let conn = await require('amqplib').connect(amqpConf.host);
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
            channel.close();
        }
    }
}

module.exports = (()=> {
    return new RabbitAmqp();
})();