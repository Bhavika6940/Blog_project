const User = require("./user.model");
const Post = require("./post.model");
const Category = require("./category.model");
const Comment = require("./comment.model");
const Role = require("./role.model");
const Permission = require("./permission.model");


// USER <-> ROLE

User.belongsTo(Role, {foreignKey : "roleId"});
Role.hasMany(User , {foreignKey : "roleId"});

// ROLE <-> PERMISSION

Role.belongsToMany(Permission, {
    through : "role_permissions",
    foreignKey : "roleId",
    otherKey : "permissionId"
});

Permission.belongsToMany(Role, {
    through : "role_permissions",
    foreignKey : "permissionId",
    otherKey : "roleId"
});

await Role.create({name : "SUPER_ADMIN"});
await Role.create({name : "ADMIN"});


module.exports = {
    User,
    Post,
    Category,
    Comment,
    Role,
    Permission
};