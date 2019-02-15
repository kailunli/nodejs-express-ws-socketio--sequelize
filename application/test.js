'use strict'

class Test {
    constructor() {

    }

    testDbConnect() {
        sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    testMongo() {
        mongo.conn( function(err, client){
            console.log("Connected successfully to Mongo server");

            let llkl = client.db("llkl");
            let lkl_users = llkl.collection("lkl_users");
            // Insert some documents
            lkl_users.insertMany([
                {a : 1}, {a : 2}, {a : 3}
            ], function(err, result) {
                console.log("Inserted 3 documents into the collection");
            });

        });
        console.log("test mongo success!")
    }
}

module.exports = new Test();