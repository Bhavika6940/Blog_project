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

router.post("/", verifyToken,authorize("role", "canWrite"),(req, res) => {
    createData(req, res,Role);
});

router.put("/:id", verifyToken, authorize("role", "canWrite"), (req,res) => {
    updateData(req, res, Role);
});


router.delete("/:id", verifyToken, authorize("role", "canDelete"),(req, res) => {
    deleteData(req, res, Role);
});

router.get("/", verifyToken, authorize("role", "canRead"), (req, res) => {
   getAllData(req, res, Role);
});

router.get("/:id", verifyToken, authorize("role", "canRead"),(req, res) => {
    getDataById(req, res, Role);
});
module.exports = router;