'use strict'

app.get("/test/testMongo", function (req, res) {
    test.testMongo();

    res.send("success");
});

app.get("/test/testMongoose", function(req, res) {
    test.testMongoose();

    res.send("success");
});