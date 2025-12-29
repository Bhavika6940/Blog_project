const express = require("express");
const router = express.Router();
const { createData,
    updateData,
    deleteData,
    getAllData,
    getDataById
} = require("../controllers/comment.controller");
const  Permission  = require("../models");
const {verifyToken} = require("../middlewares/auth.middleware");

router.post("/", verifyToken,(req, res) => {
    createData(req, res,Permission);
});

router.put("/:id", verifyToken,(req, res) => {
    updateData(req, res, Permission);
});

router.delete("/:id", verifyToken,(req, res) => {
    deleteData(req, res, Permission);
});

router.get("/", verifyToken,(req, res) => {
   getAllData(req, res, Permission);
});

router.get("/:id", verifyToken, (req, res) => {
    getDataById(req, res, Permission);
});
module.exports = router;