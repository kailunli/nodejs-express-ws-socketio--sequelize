'use strict'

class Helper {
    objlength (obj) {
        if (typeof obj == 'object') {
            if (obj instanceof Array) {
                return obj.length;
            }
            if (obj instanceof Object) {
                var length = 0;
                for (var i in obj) {
                    length++;
                }
                return length;
            }
        }
        return 0;
    }

    getValue (data, index=0) {
        try {
            return data[index]['dataValues'];
        } catch (e) {
            return [];
        }
    }

    getValues (data) {
        try {
            let res = [];
            for (let i in data) {
                res.push(data[i]['dataValues']);
            }
            return res;
        } catch (e) {
            return [];
        }
    }

    // 写入文件
    writeFile (filepath, content, options={flag:'a'}, callback=function(writeRes){}) {
        if (typeof filepath == "string" && typeof content == "string") {
            let fs = require("fs");
            let writeRes = fs.writeFile(filepath, content, options, callback);
            if (typeof callback == "function") {
                callback(writeRes);
            }
            return writeRes;
        }
        return false;
    }

    // 通过socket 获取客户端IP
    getClientIp(socket) {
        let ip = null;
        if (socket.handshake.headers['x-forwarded-for'] != null) {
            ip = socket.handshake.headers['x-forwarded-for'];
        } else {
            if (socket.handshake.address.substr(0, 7) === "::ffff:") {
                ip = socket.handshake.address.substr(7);
            } else {
                ip = socket.handshake.address;
            }
        }
        return ip;
    }

    getQueue(name) {
        if (name && typeof name == "string") {
            if (queues.hasOwnProperty(name)) {
                return queues[name];
            }
        }

        if (queues.hasOwnProperty("default")) {
            return queues["defualt"];
        }
        return null;
    }

    getEmiter(name) {
        if (name && typeof name == "string") {
            if (emiters.hasOwnProperty(name)) {
                return emiters[name];
            }
        }

        if (emiters.hasOwnProperty("default")) {
            return emiters["defualt"];
        }
        return null;
    }

    test (req, res, filepath, header={"content-type":"text/html;charset=utf-8;"}, status=200) {
        let fs = require("fs")
        fs.readFile(filepath, "utf-8", function(err, data) {
            res.writeHead(status, header);
            res.write(data);
            res.end();
        });
    }
}



module.exports = new Helper();