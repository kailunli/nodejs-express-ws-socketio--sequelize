'use strict'

module.exports = {
    host: "localhost",
    dialect: "mysql", // "mysql"|"sqlite"|"postgres"|"mssql"
    database: DB_NAME,
    username: USERNAME,
    password: PASSWORD,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    //storage: "mysql",
};
