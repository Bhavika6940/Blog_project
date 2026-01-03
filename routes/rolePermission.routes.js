const express = require("express");
const router = express.Router();
const { createData,
    updateData,
    deleteData,
    getAllData,
    getDataById
} = require("../controllers/rolePermission.controller");
const  {RolePermission } = require("../models");
const {verifyToken, authorize} = require("../middlewares/auth.middleware");

router.post("/", verifyToken, authorize("rolepermission", "canWrite"),(req, res) => {
    createData(req, res,RolePermission);
});

router.put("/:id", verifyToken, authorize("rolepermission", "canWrite"),(req, res) => {
    updateData(req, res, RolePermission);
});

router.delete("/:id", verifyToken, authorize("rolepermission", "canDelete"),(req, res) => {
    deleteData(req, res, RolePermission);
});

router.get("/", verifyToken, authorize("rolepermission", "canRead"),(req, res) => {
   getAllData(req, res, RolePermission);
});

router.get("/:id", verifyToken,  authorize("rolepermission", "canRead"),(req, res) => {
    getDataById(req, res, RolePermission);
});
module.exports = router;
