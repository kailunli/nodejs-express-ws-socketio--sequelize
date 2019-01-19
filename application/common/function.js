'use strict'

class Function {
    getValue(data, index=0) {
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
}

module.exports = new Function();