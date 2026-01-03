const {sequelize} = require('../config/db');
const { DataTypes } = require('sequelize');


const User = sequelize.define('User',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },

        roleId : {
            type : DataTypes.INTEGER,
            allowNull: false,
            references : {
                model : 'role',
                key : 'id'
            }

        }
    },
    {
        tableName: 'user',
        timestamps: true
    }
);

module.exports = User;
