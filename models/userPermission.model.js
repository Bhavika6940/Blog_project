const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const UserPermission = sequelize.define("UserPermission", {
    canRead: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },

    canWrite: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },

    canDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    tableName: "userPermission",
    timestamps: false
});

module.exports = UserPermission;
