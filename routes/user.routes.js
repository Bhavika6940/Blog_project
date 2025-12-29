const express = require("express");
const router = express.Router();
const { createData,
    getAllData,
    getDataById,
    updateData,
    deleteData
} = require("../controllers/user.controller");
const  User  = require("../models");
const upload = require("../services/upload.service");
const { verifyToken} = require('../middlewares/auth.middleware');
const {login} = require("../controllers/auth.controller");

router.post("/login", login);

router.post("/", upload.single("image"),(req, res) => {
    createData(req, res, User);
});
router.get("/", verifyToken,(req, res) => {
    getAllData(req, res, User);
});

router.get("/:id", verifyToken,(req, res) => {
    getDataById(req, res, User);
});

router.put("/:id", verifyToken,(req, res) => {
    updateData(req, res, User);
});

router.delete("/:id", verifyToken, (req, res) => {
    deleteData(req, res, User);
});

module.exports = router;
