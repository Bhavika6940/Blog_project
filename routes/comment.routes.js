const express = require("express");
const router = express.Router();
const { createData,
    updateData,
    deleteData,
    getAllData,
    getDataById
} = require("../controllers/comment.controller");
const  {Comment}  = require("../models");
const {verifyToken   } = require("../middlewares/auth.middleware");

router.post("/", verifyToken ,(req, res) => {
    createData(req, res, Comment);
});

router.put("/:id", verifyToken, (req, res) => {
    updateData(req, res, Comment);
});

router.delete("/:id", verifyToken,(req, res) => {
    deleteData(req, res, Comment);
});

router.get("/", verifyToken,(req, res) => {
   getAllData(req, res, Comment);
});

router.get("/:id", verifyToken,(req, res) => {
    getDataById(req, res, Comment);
});
module.exports = router;