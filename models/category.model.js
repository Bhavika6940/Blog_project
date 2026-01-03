const {sequelize} = require('../config/db');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true

    }
},
    {
        tableName: 'category',
        timestamps: true
    }
);

module.exports = Category;
