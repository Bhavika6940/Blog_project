const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../models");

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ where : {email}});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn : "1d"}
    );

    return res.status(200).json({
        success: true, 
        message : "Login successful",
        token,
        user : {
            id : user.id,
            email : user.email,
            role: user.role
        }
    });
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Login failed",
            error : error.message
        })

    }
};

module.exports = { login };