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
const { verifyToken, authorize  } = require('../middlewares/auth.middleware');


router.get("/", verifyToken,authorize("post", "canRead"),   (req, res) => {
    getAllData(req, res, Post);
});
router.get("/:id", verifyToken,authorize("post" , "canRead"),(req, res) => {
    getDataById(req, res, Post);
});
router.post("/",  verifyToken ,authorize("post", "canWrite"), upload.single("image") , (req, res) => {
    createData(req, res, Post);
});
router.put("/:id", verifyToken , authorize("post", "canWrite"),(req, res) => {
    updateData(req, res, Post);

});
router.delete("/:id", verifyToken,authorize("post", "canDelete"), (req, res) => {
    deleteData(req, res, Post)
});



module.exports = router;



