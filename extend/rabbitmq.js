'use strict'

const path = require('path');
const amqpConf = require(path.resolve(__dirname, '..') + '/application/common/amqp_conf');

class RabbitAmqp {
    constructor() {
        this.init();
    }

    // 初始化
    async init() {
    }

    // 生产
    async produce(queueIndex, content="") {
        let conn = await require('amqplib').connect(amqpConf.host);
        let channel = await conn.createChannel();
        try {
            let queue = queues[queueIndex];
            let queueName = queue.name;
            let exchange = queue.exchange;
            let exchangeType = queue.exchangeType;
            let routingKey = queue.routingKey;

            channel.setMaxListeners(0);
            if (queueName && typeof queueName == "string") {
                await channel.assertQueue(queueName);
            }

            // 绑定Queue和Exchange
            if (routingKey && typeof routingKey == "string") { // 使用routingKey绑定
                await channel.assertExchange(exchange, exchangeType);
                channel.bindQueue(queueName, exchange, routingKey);
                channel.publish(exchange, routingKey, content);
            } else { // routingkey不存在，直接声明Queue，然后发送消息到Queue即可
                channel.sendToQueue(queueName, content);
            }
        } catch (e) {
            if (channel) {
                channel.close();
            }
            throw e;
        }
    }

    // 消费
    async consume(queueIndex, callback, prefetchCount=1, global=true) {
        let conn = await require('amqplib').connect(amqpConf.host);
        let channel = await conn.createChannel();
        try {
            let queue = queues[queueIndex];
            let queueName = queue.name;

            channel.prefetch(prefetchCount, global); // global true:连接共享  false:信道共享
            channel.assertQueue(queueName);
            channel.consume(queueName, async (content) => {
                if (content) {
                    try {
                        if (typeof callback == "function") {
                            await callback(content);
                        }
                    } catch (e) {
                        channel.close();
                        throw e;
                    }
                    channel.ack(content);
                }
            });
        } catch (e) {
            if (channel) {
                channel.close();
            }
            throw e;
        }
    }
}

module.exports = (()=> {
    return new RabbitAmqp();
})();