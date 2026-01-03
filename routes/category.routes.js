const express = require("express");
const router = express.Router();
const {createData,
    getDataById,
    getAllData,
    updateData,
    deleteData
} = require("../controllers/category.controller");
const  {Category}  = require("../models");
const {verifyToken, authorize}  = require("../middlewares/auth.middleware");


router.post("/", verifyToken, authorize("category", "canWrite") ,(req, res) => {
    createData(req, res, Category);
});
router.get("/:id", verifyToken, authorize("category", "canRead") ,(req, res) => {
    getDataById(req, res, Category);
});
router.get("/", verifyToken, authorize("category", "canRead") ,(req, res) => {
    getAllData(req, res, Category);
});

router.put("/:id", verifyToken, authorize("category", "canWrite") ,(req, res) => {
    updateData(req, res, Category);
});

router.delete("/:id", verifyToken, authorize("category", "canDelete") , (req, res) => {
    deleteData(req, res, Category);
})

module.exports = router;