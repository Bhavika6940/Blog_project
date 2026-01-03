const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Permission = sequelize.define("Permission" , {
    resource : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    name : DataTypes.STRING,
    description : DataTypes.STRING
},{
    tableName : "permission",
    timestamps : false
});

module.exports = Permission;