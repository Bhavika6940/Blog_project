const service = require("../services/db.service");
const Validator = require('validatorjs');



const getAllData = async (req, res, Model) => {
    try {
        const dbRes = await service.findAllRecord(Model);
        res.status(200).json({
            message: "Data fetched successfully!",
            success: true,
            data: dbRes
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error!",
            success: false,
            message: err.message
        });
    }
};




const getDataById = async (req, res, Model) => {
    try {
        
        const dbRes = await service.findById(req.params.id, Model);

        if (!dbRes) {
            return res.status(404).json({
                success: false,
                message: "Record not found!"
            })
        }
        res.status(200).json(
            {
                message: "Record found!",
                success: true,
                data: dbRes
            }
        )
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Internal server error!"

        })

    }
};

const createData = async (req, res, Model) => {
    try {
        const data = JSON.parse(JSON.stringify(req.body));

         if (data.tags && typeof data.tags === "string") {
            data.tags = data.tags.split(",").map(tag => tag.trim());
        }

        if(req.file && Model.name === "Post"){
            data.image = `/img/${req.file.filename}`;
        }

        if (Model.name === "Post") {
            const rules = {
                title: "required|string|min:3|max:150",
                slug: "sometimes|string|min:3|max:200|regex:/^\\S+$",
                content: "required|string|min:10",
                excerpt: "sometimes|string|max:300",
                metaTitle: "sometimes|string|max:60",
                metaDescription: "sometimes|string|max:160",
                authorId: "required|integer",
                categoryId: "required|integer",
                tags: "array",
                "tags.*": "string",
                status: "in:Draft,Published",
                views: "numeric|min:0"
            };
            const validation = new Validator(data, rules);

            if (validation.fails()) {
                return res.status(422).json({
                    success: false,
                    errors: Object.keys(validation.errors.all()).map(field => ({
                        field,
                        message: validation.errors.first(field)
                    }))
                })
            }
        }

        const dbRes = await service.createNewRecord(data, Model);
        res.status(201).json({
            success: true,
            message: "Record created successfully!",
            data: dbRes
        })
    }
    catch (err) {
        if (err.name === "SequelizeUniqueConstraintError"  ||  err.original?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Already exists!",
                error: err.message,
                success: false
            })
        }
        res.status(500).json({
            message: "Internal server error!",
            success: false,
            error: err.message
        })
    }
};

const updateData = async (req, res, Model) => {
    try {
        const rules = {
                title: "sometimes|string|min:3|max:150",
                slug: "sometimes|string|min:3|max:200",
                context: "sometimes|string|min:10",
                excerpt: "sometimes|string|max:300",
                metaTitle: "sometimes|string|max:60",
                metaDescription: "sometimes|string|max:160",
                tags: "array",
                "tags.*": "string",
                status: "sometimes|in:Draft,Published",
                views: "numeric|min:0",
                image: "sometimes|string"
            }
            const validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res.status(422).json({
                    success: false,
                    errors: Object.keys(validation.errors.all()).map(field => ({
                        field,
                        message: validation.errors.first(field)
                    }))
                });
        }
        const id = req.params.id;
        const data = req.body;
        const dbRes = await service.updateRecord(id, data, Model);
        if (!dbRes) {
            return res.status(404).json({
                success: false,
                message: "Record not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Record updated successfully!",
            data: dbRes

        });
        }
    catch (err) {

        if (err.name === "SequelizeUniqueConstraint" || err.original?.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Duplicate entry detected!",
                error: err.errors?.[0]?.message || err.message
            });
        }

         res.status(400).json({
            success: false,
            message: "Internal server error!",
            error: err.message
        });

        }
       
    }


const deleteData = async (req, res, Model) => {
    try {
        const id = req.params.id;
        const dbRes = await service.deleteRecord(id, Model);
        if (!dbRes) {
            return res.status(404).json({
                success: false,
                message: "Record not found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Record deleted successfully!",
            data: dbRes
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            message: "Internal server error!"
        });

    }

}

module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData
}