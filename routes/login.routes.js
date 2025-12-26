const express = require("express");
const router = express.Router();
const  loginController = require("../controllers/auth.controller");

router.post("/", (req,res) => {
    loginController.login(req,res);
});

module.exports = router;