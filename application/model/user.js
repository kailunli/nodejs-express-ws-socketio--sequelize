'use strict'

class User {
    constructor() {
        this.table = 'lkl_user';
    }

    model() {
        return sequelize.define(this.table, this.entity(), this.option());
    }

    entity() {
        return {
            userid: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: '主键，用户ID',
                field: 'id', // 数据表真正字段名称id
            },
            username: {
                type: Sequelize.STRING(60),
                allowNull: false,
                defaultValue: '',
                comment: '用户名称',
            },
            create_at: {
                type: Sequelize.INTEGER(10),
                allowNull: false,
                defaultValue: 0,
                comment: '创建时间',
            },
            update_at: {
                type: Sequelize.INTEGER(10),
                allowNull: false,
                defaultValue: 0,
                comment: '更新时间',
            },
        };
    }

    option() {
        return {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // don't delete database entries but set the newly added attribute deletedAt
            // to the current date (when deletion was done). paranoid will only work if
            // timestamps are enabled
            paranoid: true,

            // disable the modification of table names; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
            // define the table's name
            tableName: this.tableName,

            comment: '用户表',
        };
    }
}

module.exports = new User();