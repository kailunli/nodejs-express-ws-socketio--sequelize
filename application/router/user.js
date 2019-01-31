'use strict'

const path = require("path");
const viewpath = path.resolve(__dirname, '..') + '/view/';

app.get('/user/:userid', async function(req, res){
    let params = req.params;
    let userid = params.hasOwnProperty('userid') ? parseInt(params.userid) : 0;

    let UserModel = require(path.resolve(__dirname, '..') + '/model/user');
    /*let user = await UserModel.model().findByPk(userid).then(user=>{
        return user;
    });*/
    let user = await UserModel.model().findAll({
        where: {
            userid: {
                [Sequelize.Op.eq]: userid
            }
        }
    }).then(user=>{
        return user;
    });
    res.send(user);
});

app.get('/users', async function (req, res) {
    let UserModel = require(path.resolve(__dirname, '..') + '/model/user');
    let users = await UserModel.model().findAll({

    }).then(users=>{
        return users;
    });
    res.send(users);
});