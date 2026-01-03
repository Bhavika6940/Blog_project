const jwt = require("jsonwebtoken");
const {User , Role, Permission} = require("../models");
const RolePermission = require("../models/rolePermission.model");
const UserPermission = require("../models/userPermission.model");


///Verify JWT Token
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({
            message : "Access denied. No token provided. "
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findByPk(decoded.id, {
            include : {
                model : Role
            }

        });
        req.user = user;
        next();
    }
    catch(error) {
        return res.status(401).json({
            message : "Invalid or expired token."
        })
    }
}


const authorize = (resource , action) => {
    return async (req, res , next) => {
        try {
            const user = req.user;

            if(!user || !user.roleId){
                return res.status(401).json({
                    message : "Unauthorized"
                });
            }

            if(user.Role?.name === "SUPER_ADMIN"){
                return next();
            }
            
            const permission = await Permission.findOne({
                where : { resource }
            });

            if(!permission){
                return res.status(403).json({
                    message : `Permission ${resource} not found.`
                })
            }

            const rolePermission = await RolePermission.findOne({
                where : {
                    roleId : user.roleId,
                    permissionId : permission.id
                }
            });
            
            const roleAllowed = rolePermission ? rolePermission[action] : false;

            if(!rolePermission){
                return res.status(403).json({
                    message : `Role has no access to ${resource}`
                });
            }
            
            if(!roleAllowed) {
                return res.status(403).json({
                    message : `Role is not allowed to ${action} ${resource}`
                });
            }

           const userPermission = await UserPermission.findOne({
                where: { userId: user.id }
            });

            if (userPermission && userPermission[action] === false) {
                return res.status(403).json({
                    message : `Your ${action} permisson on ${resource} is revoked`
                });
            }
            return next();
        }
        catch(error){
            console.error("Authorization error:", error);
            return res.status(500).json({ message: "Authorization failed" });
        }
    }

   
}

const capitalize = (str) => {
    str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    verifyToken,
    authorize,
    capitalize
};





