const User = require("./user.model");
const Post = require("./post.model");
const Category = require("./category.model");
const Comment = require("./comment.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const RolePermission = require("./rolePermission.model");
const UserPermission = require("./userPermission.model");




// USER -> ROLE

User.belongsTo(Role, {foreignKey : "roleId"});
Role.hasMany(User , {foreignKey : "roleId"});

// ROLE -> RolePermission
Role.hasMany(RolePermission, {foreignKey : "roleId"});
RolePermission.belongsTo(Role, {foreignKey : "roleId"});

// USER -> USERPERMISSION
User.hasOne(UserPermission, {foreignKey : "userId"}); //foreign key lives in other table
UserPermission.belongsTo( User, {foreignKey : "userId"});// foreign key lives in this table that is in up

// Role <-> Permission (Many to Many)
Permission.hasMany(RolePermission, { foreignKey: "permissionId" });
RolePermission.belongsTo(Permission, { foreignKey: "permissionId" });


seedRBAC = async () => {
   await Role.bulkCreate(
    [
      { name: "SUPER_ADMIN" },
      { name: "ADMIN" },
      { name: "AUTHOR" }
    ],
    { ignoreDuplicates: true }
  );

  // Permissions
  await Permission.bulkCreate(
    [
      { resource: "user", name: "USER_MANAGEMENT", description: "Manage users" },
      { resource: "role", name: "ROLE_MANAGEMENT", description: "Manage roles" },
      { resource: "category", name: "CATEGORY_MANAGEMENT", description: "Manage categories" },
      { resource: "post", name: "POST_MANAGEMENT", description: "Manage posts" }
    ],
    { ignoreDuplicates: true }
  );

  console.log("RBAC seeded successfully");
}


module.exports = {
    User,
    Post,
    Category,
    Comment,
    Role,
    Permission,
    RolePermission,
    UserPermission,
    Permission,
    seedRBAC
};