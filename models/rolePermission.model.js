const {DataTypes} = require("sequelize");
const { sequelize } = require("../config/db");
const RolePermission = sequelize.define("RolePermission", {
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "roles",
                key: "id"
            }
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "permissions",
                key: "id"
            }
        }
    }, {
        tableName: "role_permissions"
    });



module.exports = RolePermission;