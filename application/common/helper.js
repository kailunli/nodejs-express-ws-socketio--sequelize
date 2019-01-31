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
                res[i] = data[i]['dataValues'];
            }
            return res;
        } catch (e) {
            return [];
        }
    }

    // 写入文件
    writeFile (filepath, content, options={flag:'a'}, callback=function(){}) {
        if (typeof filepath == "string" && typeof filepath == "string") {
            let fs = require("fs");
            return fs.writeFile(filepath, content, options, callback);
        }
        return false;
    }

    demo (req, res, filepath, header={"content-type":"text/html;charset=utf-8;"}, status=200) {
        let fs = require("fs")
        fs.readFile(filepath, "utf-8", function(err, data) {
            res.writeHead(status, header);
            res.write(data);
            res.end();
        });
    }
}



module.exports = new Helper();