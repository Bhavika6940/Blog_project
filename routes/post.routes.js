const express = require("express");
const router = express.Router();
const { getAllData,
     getDataById,
    createData, 
    updateData,
    deleteData

} = require("../controllers/post.controller");
const  Post  = require("../models");
const upload = require("../services/upload.service");
const { verifyToken, authorize, checkOwnership } = require('../middlewares/auth.middleware');


router.get("/", verifyToken, (req, res) => {
    getAllData(req, res, Post);
});
router.get("/:id", verifyToken,(req, res) => {
    getDataById(req, res, Post);
});
router.post("/",  verifyToken ,upload.single("image"), (req, res) => {
    createData(req, res, Post);
});
router.put("/:id", verifyToken ,(req, res) => {
    updateData(req, res, Post);

});
router.delete("/:id", verifyToken, (req, res) => {
    deleteData(req, res, Post)
});



module.exports = router;


// authorize("canEdit"), checkOwnership(Post)
