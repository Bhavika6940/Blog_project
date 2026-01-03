const express = require("express");
const router = express.Router();
const { createData,
    updateData,
    deleteData,
    getAllData,
    getDataById
} = require("../controllers/userPermission.controller");
const  {UserPermission } = require("../models");
const {verifyToken, authorize} = require("../middlewares/auth.middleware");

router.post("/", verifyToken, authorize("userpermission", "canWrite"),(req, res) => {
    createData(req, res,UserPermission);
});

router.put("/:id", verifyToken, authorize("userpermission", "canWrite"),(req, res) => {
    updateData(req, res, UserPermission);
});

router.delete("/:id", verifyToken, authorize("userpermission", "canDelete"),(req, res) => {
    deleteData(req, res, UserPermission);
});

router.get("/", verifyToken, authorize("userpermission", "canRead"),(req, res) => {
   getAllData(req, res, UserPermission);
});

router.get("/:id", verifyToken,  authorize("userpermission", "canRead"),(req, res) => {
    getDataById(req, res, UserPermission);
});
module.exports = router;
