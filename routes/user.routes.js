const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { User } = require("../models");

router.post("/", (req, res) => {
    userController.createData(req, res, User);
});
router.get("/", (req, res) => {
    userController.getAllData(req, res, User);
});

router.get("/:id", (req, res) => {
    userController.getDataById(req, res, User);
});

router.put("/:id", (req, res) => {
    userController.updateData(req, res, User);
});

router.delete("/:id", (req, res) => {
    userController.deleteData(req, res, User);
});

module.exports = router;
