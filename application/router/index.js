'use strict'

const path = require("path");
const url = require("url");
const querystring = require("querystring");
const viewpath = path.resolve(__dirname, '..') + '/view/';

app.get('/', function(req, res){
    // let params = url.parse(req.url, true).query;
    // res.send(params);
    // res.send('<h1>Hello World</h1>');
    // res.render('index', {message: 'hello word'});
    res.sendFile(viewpath + "index.html");
});

app.get('/emiters', function (req, res) {
    let querys = req.query;

    if (JSON.stringify(querys) == "{}") { // 没有参数
        res.send(emiters);
    } else if (querys.hasOwnProperty("name")) {
        res.send(emiters[querys.name]);
    } else {
        res.send({});
    }
});