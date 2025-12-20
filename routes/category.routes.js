const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { Category } = require("../models");

router.post("/", (req, res) => {
    categoryController.createData(req, res, Category);
});
router.get("/:id", (req, res) => {
    categoryController.getDataById(req, res, Category);
});
router.get("/", (req, res) => {
    categoryController.getAllData(req, res, Category);
});

router.put("/:id", (req, res) => {
    categoryController.updateData(req, res, Category);
});

router.delete("/:id", (req, res) => {
    categoryController.deleteData(req, res, Category);
})

module.exports = router;