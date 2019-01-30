'use strict'

let redisConf = require('./application/redis_conf');

// ioredis 开发人员代码操作使用的redis服务
const Redis = require("ioredis");
module.exports = new Redis({
    host: redisConf.host,
    port: redisConf.port,
    password: redisConf.auth
});