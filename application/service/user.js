'use strict'

const path = require("path");
const user = require(path.resolve(__dirname, "..") + "/model/user");
const Base = require('./base');

class User extends Base {
    constructor() {
        super(); // 实现父类构造器
        this.UserModel = user.model();
    }

    addUser(userInfo) {
        let User = this.UserModel;
        return User.sync(/*{force: true}*/).then(() => {
            // Table created
            return User.create(userInfo);
        });
    }

    getUser(userId=0, username='') {
        let User = this.UserModel;
        let Op = Sequelize.Op;

        let where = {};
        if (userId > 0) {
            where['userid'] = parseInt(userId);
        }
        if (username!='') {
            where['username'] = {[Op.like]:username}
        }

        return User.sync().then(()=>{
            return User.findAll({
                where: where
            });
        });
    }

    /**
     * 获取用户列表
     * @param page
     * @param size
     */
    getUserList(page=1, size=20) {
        let User = this.UserModel;
        return User.sync().then(()=>{
            return User.findAll({
                attributes: ["userid", "username"],
                offset: (page>0 ? page-1 : 0)*size,
                limit: size
            });
        });
    }
}

module.exports = new User();