const jwt = require("jsonwebtoken");
const {User} = require("../models");


///Verify JWT Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({
            message : "Access denied. No token provided. "
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(error) {
        return res.status(401).json({
            message : "Invalid or expired token."
        })
    }
}


/// RBAC (Role Based Access Control) + Permissions

const authorize = (action) => {
    return async (req, res ,next) => {
        try{
            const user = await User.findByPk(req.user.id);

            if(!User) return res.status(404).json({
                message : "User not found."
            });

            //Admin bypass
            if(user.role === "admin") return next();

            //Permission check for authors
            const permissions = user.permissions || {};
            if(user.role === "author"  && permissions[action]){
                req.currentUser = user;
                return next();
            }

            return res.status(403).json({
                message : `Forbidden : Missing ${action} permission.` 
            });
        }
        catch(error){
            next(error);  // Pass to global error handler
        }
    }
}


///Ownership Check

const checkOwnership = (Model , ownerField = "userId") => {
    return async (req,res,next) => {
        try {
            const record = await Model.findByPk(req.params.id);

            if(!record) return res.status(404).json({
                message : "Resource not found."
            })
            
            //Admin can see/edit everything
            if(req.user.role === "admin") {
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

module.exports = {
    verifyToken,
    authorize,
    checkOwnership
};