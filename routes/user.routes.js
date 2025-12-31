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


router.post("/login", login);

router.post("/",  (req, res) => {
    createData(req, res, User);
});
router.get("/", verifyToken, authorize("GET_USERS"),(req, res) => {
    getAllData(req, res, User);
}); 

router.get("/:id", verifyToken, authorize("GET_USER_BY_ID"),(req, res) => {
    getDataById(req, res, User);
});

router.put("/:id", verifyToken,authorize("UPDATE_USERS"), (req, res) => {
    updateData(req, res, User);
});

router.delete("/:id", verifyToken, authorize("DELETE_USERS"), (req, res) => {
    deleteData(req, res, User);
});

module.exports = router;
