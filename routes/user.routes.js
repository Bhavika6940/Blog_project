const express = require("express");
const router = express.Router();
const { createData,
    getAllData,
    getDataById,
    updateData,
    deleteData
} = require("../controllers/user.controller");
const { User } = require("../models");
const upload = require("../services/upload.service")

router.post("/", upload.single("image"),(req, res) => {
    createData(req, res, User);
});
router.get("/", (req, res) => {
    getAllData(req, res, User);
});

router.get("/:id", (req, res) => {
    getDataById(req, res, User);
});

router.put("/:id", (req, res) => {
    updateData(req, res, User);
});

router.delete("/:id", (req, res) => {
    deleteData(req, res, User);
});

module.exports = router;
