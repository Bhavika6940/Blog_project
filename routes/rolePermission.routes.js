const express = require("express");
const router = express.Router();
const { createData,
    deleteData,
    getAllData
} = require("../controllers/comment.controller");
const  {RolePermission}  = require("../models");
const {verifyToken, authorize} = require("../middlewares/auth.middleware");

router.post("/", verifyToken, authorize("SET_PERMISSION_FOR_ROLE"),(req, res) => {
    createData(req, res, RolePermission);
});

router.delete("/:id", verifyToken, authorize("DELETE_PERMISSION_FOR_ROLE"),(req, res) => {
    deleteData(req, res, RolePermission);
});

router.get("/", verifyToken,(req, res) => {
   getAllData(req, res, RolePermission);
});

module.exports = router;