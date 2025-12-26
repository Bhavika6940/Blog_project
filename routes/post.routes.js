const express = require("express");
const router = express.Router();
const { getAllData,
     getDataById,
    createData, 
    updateData,
    deleteData

} = require("../controllers/post.controller");
const { Post } = require("../models");
const upload = require("../services/upload.service");
const verifyToken = require("../middlewares/verifyToken");
const checkOwnership = require("../middlewares/ownsership");
const {deletePost , updatePost , getMyPosts} = requi


router.get("/", (req, res) => {
    getAllData(req, res, Post);
});
router.get("/:id", (req, res) => {
    getDataById(req, res, Post);
});
router.post("/", verifyToken ,upload.single("image"), (req, res) => {
    createData(req, res, Post);
});
router.put("/:id", verifyToken, authorize("canEdit"), checkOwnership(Post),(req, res) => {
    updateData(req, res, Post);

});
router.delete("/:id", verifyToken, authorize("canDelete"), checkOwnership(Post), (req, res) => {
    deleteData(req, res, Post)
});

// router.get(
//   "/my-posts",
//   verifyToken,
//   authorize("canRead"),
//   getMyPosts
// );
    //  check

module.exports = router;
