const {DataTypes} = require("sequelize");
const { sequelize } = require("../config/db");
const RolePermission = sequelize.define("RolePermission", {
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey : true
        }
    }, {
        tableName: "rolePermissions"
    });



module.exports = RolePermission;