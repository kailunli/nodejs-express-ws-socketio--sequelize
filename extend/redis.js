'use strict'

const path = require('path');
let redisConf = require(path.resolve(__dirname, '..') + '/application/common/redis_conf');

// ioredis 开发人员代码操作使用的redis服务
let options = {
    host: redisConf.host,
    port: redisConf.port,
};

if (redisConf.hasOwnProperty("auth") && redisConf.auth) {
    options["password"] = auth;
}

const Redis = require("ioredis");
module.exports = new Redis(options);