const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { Comment } = require("../models");

router.post("/", (req, res) => {
    commentController.createData(req, res, Comment);
});

router.put("/:id", (req, res) => {
    commentController.updateData(req, res, Comment);
});

router.delete("/:id", (req, res) => {
    commentController.deleteData(req, res, Comment);
});

router.get("/", (req, res) => {
    commentController.getAllData(req, res, Comment);
});

router.get("/:id", (req, res) => {
    commentController.getDataById(req, res, Comment);
});
module.exports = router;