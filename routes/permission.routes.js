const express = require("express");
const router = express.Router();
const { createData,
    updateData,
    deleteData,
    getAllData,
    getDataById
} = require("../controllers/permission.controller");
const  {Permission } = require("../models");
const {verifyToken, authorize} = require("../middlewares/auth.middleware");

router.post("/", verifyToken, authorize("permission", "canWrite"),(req, res) => {
    createData(req, res,Permission);
});

router.put("/:id", verifyToken, authorize("permission", "canWrite"),(req, res) => {
    updateData(req, res, Permission);
});

router.delete("/:id", verifyToken, authorize("permission", "canDelete"),(req, res) => {
    deleteData(req, res, Permission);
});

router.get("/", verifyToken, authorize("permission", "canRead"),(req, res) => {
   getAllData(req, res, Permission);
});

router.get("/:id", verifyToken,  authorize("permission", "canRead"),(req, res) => {
    getDataById(req, res, Permission);
});
module.exports = router;
