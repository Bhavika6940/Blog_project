const User = require("./user.model");
const Post = require("./post.model");
const Category = require("./category.model");
const Comment = require("./comment.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const RolePermission = require("./rolePermission.model")


// USER <-> ROLE

User.belongsTo(Role, {foreignKey : "roleId"});
Role.hasMany(User , {foreignKey : "roleId"});

// ROLE <-> PERMISSION

Role.belongsToMany(Permission, {
    through : "RolePermissions",
    foreignKey : "roleId",
    otherKey : "permissionId"
});

Permission.belongsToMany(Role, {
    through : "RolePermissions",
    foreignKey : "permissionId",
    otherKey : "roleId"
});

const seedRBAC = async () => {
    await Role.create({ name: "SUPER_ADMIN" });
    await Role.create({ name: "ADMIN" });
    await Role.create({ name: "AUTHOR" });

    await Permission.bulkCreate([
        { name: "CREATE_ROLE" },
        { name: "CREATE_PERMISSION" },
        { name: "UPDATE_BLOG" },
        { name: "DELETE_BLOG" },
        {name : "CREATE_BLOG"},
        {name : "CREATE_CATEGORY"},
        {name : "DELETE_CATEGORY"},
        {name : "UPDATE CATEGORY"},
        {name : "CREATE_USER"},
        {name : "GET_USERS"},
        {name : "DELETE_USERS"},
        {name : "UPDATE_USERS"},
        {name : "DELETE_ROLE"},
        {name : "UPDATE_ROLE"},
        {name : "GET_ROLES"},
        {name : "GET_BLOG"},
        {name : "UPDATE_ROLE"},
        {name : "SEE_PERMISSIONS"},
        {name : "SET_PERMISSION_FOR_ROLE"},
        {name : "DELETE_PERMISSION_FOR_ROLE"},
        {name : "GET_PERMISSION_BY_ROLE"},
        {name : "GET_USER_BY_ID"},
        {name : "GET_BLOG_BY_ID"}
    ], { ignoreDuplicates: true });

    const superAdmin = await Role.findOne({ where: { name: "SUPER_ADMIN" } });
    const permissions = await Permission.findAll();

    if (superAdmin) {
        await superAdmin.setPermissions(permissions);
    }
};



module.exports = {
    User,
    Post,
    Category,
    Comment,
    Role,
    Permission,
    RolePermission,
    seedRBAC
};