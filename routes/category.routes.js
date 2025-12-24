const express = require("express");
const router = express.Router();
const {createData,
    getDataById,
    getAllData,
    updateData,
    deleteData
} = require("../controllers/category.controller");
const { Category } = require("../models");

router.post("/", (req, res) => {
    createData(req, res, Category);
});
router.get("/:id", (req, res) => {
    getDataById(req, res, Category);
});
router.get("/", (req, res) => {
    getAllData(req, res, Category);
});

router.put("/:id", (req, res) => {
    updateData(req, res, Category);
});

router.delete("/:id", (req, res) => {
    deleteData(req, res, Category);
})

module.exports = router;