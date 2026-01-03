const express = require("express");
const router = express.Router();
const { createData,
    getAllData,
    getDataById,
    updateData,
    deleteData
} = require("../controllers/user.controller");
const  {User}  = require("../models");
const upload = require("../services/upload.service");
const { verifyToken, authorize} = require('../middlewares/auth.middleware');
const {login} = require("../controllers/auth.controller");

//verifyToken, authorize("user", "canWrite"),
router.post("/login", login);

router.post("/",   (req, res) => {
    createData(req, res, User);
});
router.get("/", verifyToken,  authorize("user", "canRead"),(req, res) => {
    getAllData(req, res, User);
}); 

router.get("/:id", verifyToken, authorize("user", "canRead"), (req, res) => {
    getDataById(req, res, User);
});

router.put("/:id", verifyToken,authorize("user", "canWrite"), (req, res) => {
    updateData(req, res, User);
});

router.delete("/:id", verifyToken, authorize("user", "canDelete"), (req, res) => {
    deleteData(req, res, User);
});

module.exports = router;
