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
        role: {
            type: DataTypes.ENUM("Admin", "Author"),
            allowNull : false,
            default: "Author"
        }
    },
    {
        tableName: 'users',
        timestamps: true
    }
);

module.exports = User;
