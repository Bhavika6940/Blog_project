const express = require("express");
const router = express.Router();
const { getAllData, getDataById,
    createData, updateData,
    deleteData

} = require("../controllers/post.controller");
const { Post } = require("../models");


router.get("/", (req, res) => {
    getAllData(req, res, Post);
});
router.get("/:id", (req, res) => {
    getDataById(req, res, Post);
});
router.post("/", (req, res) => {
    createData(req, res, Post);
});
router.put("/:id", (req, res) => {
    updateData(req, res, Post);

});
router.delete("/:id", (req, res) => {
    deleteData(req, res, Post)
});

module.exports = router;
