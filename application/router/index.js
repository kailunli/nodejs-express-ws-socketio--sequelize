'use strict'

const viewpath = path.resolve(__dirname, '..') + '/view/';

app.get('/', function(req, res){
    // let params = url.parse(req.url, true).query;
    // res.send(params);
    // res.send('<h1>Hello World</h1>');
    // res.render('index', {message: 'hello word'});
    res.sendFile(viewpath + "index.html");
});