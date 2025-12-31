// const { User } = require("../models");

// const updateAuthorPermissions = async (req , res) => {
//     try{
//         const { authorId} = req.params;
//         const {permissions} = req.body;

//         const author = await User.findByPk(authorId);

//         if(!author || author.role !== "author"){
//             return res.status(404).json({
//                 success : false,
//                 message: "Author not found"
//             });
//         }

//         await author.update({permissions});

//         return res.status(200).json({
//             success : true,
//             message : "Author permissions updated",
//             permissions
//         });
//     }
//     catch(error){
//         return res.status(500).json({
//             success : false,
//             message : "Internal server error",
//             error : error.message
//         })

//     }
// }

// module.exports = {updateAuthorPermissions};