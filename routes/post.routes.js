const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { Post } = require("../models");


router.get("/", (req, res) => {
    postController.getAllData(req, res, Post);
});
router.get("/:id", (req, res) => {
    postController.getDataById(req, res, Post);
});
router.post("/", (req, res) => {
    postController.createData(req, res, Post);
});
router.put("/:id", (req, res) => {
    postController.updateData(req, res, Post);

});
router.delete("/:id", (req, res) => {
    postController.deleteData(req, res, Post)
});

module.exports = router;
