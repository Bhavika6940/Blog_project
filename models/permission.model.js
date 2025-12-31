const {DataTypes} = require("sequelize");
const {sequelize}  = require("../config/db");

const Permission = sequelize.define("Permission", {
    resource : {
        type : DataTypes.STRING,
        allowNull : false,
    },

    canRead : {
        type: DataTypes.BOOLEAN,
        allowNull : true
    },

    canWrite : {
        type : DataTypes.BOOLEAN,
        allowNull : true
    },

    canDelete : {
        type :  DataTypes.BOOLEAN,
        allowNull : true
    }
},{
    tableName : "permissions",
    timestamps : false
});

Permission.belongsTo(User , {foreignKey : "userId"});
User.hasMany(UserPermission, {foreignKey : "userId"});

module.exports = Permission;