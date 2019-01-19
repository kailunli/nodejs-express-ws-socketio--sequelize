'use strict'

const UserServ = require(path.resolve(__dirname, "..") + "/service/user");


class User {
    constructor() {
    }

    register(username) {
        let d = new Date();
        return UserServ.addUser({username: username, create_at: parseInt(d.getTime()/1000)});
    }
}


module.exports = new User();