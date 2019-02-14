'use strict'

// queue
module.exports.queue = {
    "test demo": {
        name: "test demo",
        exchange: "test demo",
        exchangeType: "fanout",
        routingKey: "test demo",
        desc: "测试"
    },

    "private chat": {
        name: "private chat",
        exchange: "private chat",
        exchangeType: "direct",
        routingKey: "private chat",
        desc: "私聊消息队列"
    },

    "public chat": {
        name: "public chat",
        exchange: "public chat",
        exchangeType: "fanout", // fanout类型交换器不需要routingKey,该类型交换器会将生产发送的消息广播到绑定的所有Queue上
        routingKey: "",
        desc: "公聊消息队列"
    },
};
