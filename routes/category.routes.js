const express = require("express");
const router = express.Router();
const {createData,
    getDataById,
    getAllData,
    updateData,
    deleteData
} = require("../controllers/category.controller");
const  Category  = require("../models");
const {verifyToken}  = require("../middlewares/auth.middleware")

router.post("/", verifyToken, (req, res) => {
    createData(req, res, Category);
});
router.get("/:id", verifyToken, (req, res) => {
    getDataById(req, res, Category);
});
router.get("/", verifyToken,(req, res) => {
    getAllData(req, res, Category);
});

router.put("/:id", verifyToken,(req, res) => {
    updateData(req, res, Category);
});

router.delete("/:id", verifyToken, (req, res) => {
    deleteData(req, res, Category);
})

module.exports = router;