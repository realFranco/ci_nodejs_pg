/**
 * Dev: f97gp1@gmail.com
 * Date: May 24h, 2020
 * 
 * Model for the table "ci_user".
 */

const Sequelize = require('sequelize');
const db = require('../config/database');

const ci_user = db.define('ci_user', {
    id_user : {
        type        : Sequelize.UUIDV4,
        primaryKey  : true
    },

    email : {
        type        : Sequelize.STRING,
        allowNull   : false,
        unique      : true
    },

    dev_lvl : {
        type        : Sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true
});

module.exports = ci_user;
