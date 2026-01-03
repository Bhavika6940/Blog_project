const {DataTypes} = require("sequelize");
const {sequelize}  = require("../config/db");


const RolePermission = sequelize.define("RolePermission", {

    canRead : {
        type: DataTypes.BOOLEAN,
        allowNull : true,
        defaultValue: true
    },

    canWrite : {
        type : DataTypes.BOOLEAN,
        allowNull : true,
        defaultValue: true
    },

    canDelete : {
        type :  DataTypes.BOOLEAN,
        allowNull : true,
        defaultValue: true
    }
},{
    tableName : "rolePermission",
    timestamps : false,
    indexes : [
        {
            unique : true,
            fields : ["roleId" , "permissionId"]
        }
    ]
});


module.exports = RolePermission;