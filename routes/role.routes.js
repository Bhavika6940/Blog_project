const express = require("express");
const router = express.Router();
const { createData,
    deleteData,
    getAllData,
    getDataById,
    updateData
} = require("../controllers/comment.controller");
const  {Role}  = require("../models");
const {verifyToken, authorize} = require("../middlewares/auth.middleware");

router.post("/", verifyToken,authorize("CREATE_ROLE"),(req, res) => {
    createData(req, res,Role);
});

router.put("/:id", verifyToken, authorize("UPDATE_ROLE"), (req,res) => {
    updateData(req, res, Role);
});


router.delete("/:id", verifyToken, authorize("DELETE_ROLE"),(req, res) => {
    deleteData(req, res, Role);
});

router.get("/", verifyToken, authorize("GET_ROLES"), (req, res) => {
   getAllData(req, res, Role);
});

router.get("/:id", verifyToken, authorize("GET_ROLES"),(req, res) => {
    getDataById(req, res, Role);
});
module.exports = router;