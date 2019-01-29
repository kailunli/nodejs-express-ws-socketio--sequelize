'use strict'

module.exports = {
    host: "localhost",
    dialect: "mysql", // "mysql"|"sqlite"|"postgres"|"mssql"
    database: 'haoyuezhibo',
    username: 'root',
    password: 'root',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    //storage: "mysql",
};
