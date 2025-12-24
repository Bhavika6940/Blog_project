const express = require("express");
const router = express.Router();
const {uploadFile} = require("../controllers/upload.controller");
const upload = require("../services/upload.service");

router.post("/", upload.single("file"), uploadFile);

module.exports = router;