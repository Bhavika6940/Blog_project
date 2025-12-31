const express = require("express");
const router = express.Router();
const { getAllData,
     getDataById,
    createData, 
    updateData,
    deleteData

} = require("../controllers/post.controller");
const  {Post}  = require("../models");
const upload = require("../services/upload.service");
const { verifyToken, authorize , checkOwnership , checkCreateOwnership } = require('../middlewares/auth.middleware');


router.get("/", verifyToken,authorize("GET_BLOG"),   (req, res) => {
    getAllData(req, res, Post);
});
router.get("/:id", verifyToken,authorize("GET_BLOG_BY_ID"), checkOwnership(Post),(req, res) => {
    getDataById(req, res, Post);
});
router.post("/",  verifyToken ,authorize("CREATE_BLOG"), upload.single("image") ,checkCreateOwnership, (req, res) => {
    createData(req, res, Post);
});
router.put("/:id", verifyToken , authorize("UPDATE_BLOG"), checkOwnership(Post),(req, res) => {
    updateData(req, res, Post);

});
router.delete("/:id", verifyToken, authorize("DELETE_BLOG"), checkOwnership(Post), (req, res) => {
    deleteData(req, res, Post)
});



module.exports = router;



