const jwt = require("jsonwebtoken");
const {User , Role, Permission} = require("../models");


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


/// RBAC (Role Based Access Control) + Permissions

const authorize = (permissionName) => {
    return async (req, res ,next) => {
        try{
            const user = req.user;
            

            if(!user || ! user.Role){
                return res.status(403).json({
                    message : "Access denied . Role not found."
                })
            }
            const roleWithPermissions = await Role.findByPk(user.Role.id,{
                include : [Permission]
            });

            const permissions = roleWithPermissions?.Permissions || [];

            const hasPermission = permissions.some(
                p => p.name === permissionName
            )
            if(!hasPermission){
                return res.status(403).json({
                message : `You are FORBIDDEN to do this type of operation.` 
            });
            
        };
        next(); 
            
        }
        catch(error){
            next(error);  // Pass to global error handler
        }
    }
}


const checkCreateOwnership =  () => {
    return async (req, res, next) =>{
        try{
        const loggedInUser = req.user;  // set by verifyToken
        const targetUserId = req.body.userId;

        if(!targetUserId) {
            return res.status(400).json({
                message: "userId is required to create a post"
            });
        }

        if(loggedInUser.roleId === 1){
            return next();
        }
        if (loggedInUser.roleId === 2) {
            return next();
        }

        if(loggedInUser.roleId === 3){
            if(loggedInUser.id !== targetUserId){
                return res.status(403).json({
                    message : "Authors can only create posts for themselves."
                })
            }
        }
         next();
    }
    catch(error){
        next(error);
    }

    }
    
}

///Ownership Check

const checkOwnership =  (Model , ownerField = "userId") => {
    return async (req,res,next) => {
        try {
            const record = await Model.findByPk(req.params.id);

            if(!record) return res.status(404).json({
                message : "Resource not found."
            })
            
            
            if(req.user.roleId === 1 || req.user.roleId === 2) {
                req.record = record;
                return next();
            }
            // Standard ownership check
            if (record[ownerField] !== req.user.id) {
                return res.status(403).json({ message: "Unauthorized: You do not own this resource." });
            }

            req.record = record;
            next();


        }
        catch (error) {
            next(error);
        }
    }
}

const checkCreateCommentOwnership = () => {
    return async (req, res, next) => {
        try {
            const loggedInUser = req.user;

            // userId should NEVER come from client for comments
            req.body.userId = loggedInUser.id;

            // All logged-in users can comment
            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    verifyToken,
    authorize,
    checkCreateOwnership,
    checkOwnership,checkCreateCommentOwnership 
};