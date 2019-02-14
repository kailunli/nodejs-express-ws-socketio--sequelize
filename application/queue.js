'use strict'

/**
 RabbitMQ支持消息的持久化，也就是数据写在磁盘上，为了数据安全考虑，我想大多数用户都会选择持久化。消息队列持久化包括3个部分：
　　（1）exchange持久化，在声明时指定durable => 1
　　（2）queue持久化，在声明时指定durable => 1
　　（3）消息持久化，在投递时指定delivery_mode => 2（1是非持久化）
 如果exchange和queue都是持久化的，那么它们之间的binding也是持久化的。如果exchange和queue两者之间有一个持久化，一个非持久化，就不允许建立绑定。
 */

// queue
module.exports.queue = {
    "test demo": {
        name: "test demo",
        exchange: "test demo",
        exchangeType: "fanout",
        routingKey: "",
        durable: true, // 是否持久化
        desc: "测试"
    },

    "private chat": {
        name: "private chat",
        exchange: "private chat",
        exchangeType: "direct",
        routingKey: "private chat",
        durable: true,
        desc: "私聊消息队列"
    },

    "public chat": {
        name: "public chat",
        exchange: "public chat",
        exchangeType: "fanout", // fanout类型交换器不需要routingKey,该类型交换器会将生产发送的消息广播到绑定的所有Queue上
        routingKey: "",
        durable: true,
        desc: "公聊消息队列"
    },
};
