const express = require("express");
const router = express.Router();
const { createData,
    updateData,
    deleteData,
    getAllData,
    getDataById
} = require("../controllers/comment.controller");
const { Comment } = require("../models");

router.post("/", (req, res) => {
    createData(req, res, Comment);
});

router.put("/:id", (req, res) => {
    updateData(req, res, Comment);
});

router.delete("/:id", (req, res) => {
    deleteData(req, res, Comment);
});

router.get("/", (req, res) => {
   getAllData(req, res, Comment);
});

router.get("/:id", (req, res) => {
    getDataById(req, res, Comment);
});
module.exports = router;