const service = require("../services/db.service");
const { validationResult } = require("express-validator");

const getAllData = async (req, res, schema) => {
    try {
        const dbRes = await service.findAllRecord(schema);
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




const getDataById = async (req, res, schema) => {
    try {
        const query = { _id: req.params.id };
        const dbRes = await service.findOneRecord(query, schema);

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

const createData = async (req, res, schema) => {
    try {
        if (schema.modelName === "Comment") {
            const rules = {
                name: "required|string|min:2,max:100",
                description: "string|max:500"
            };

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
        }

        const data = req.body;
        const dbRes = await service.createNewRecord(data, schema);
        res.status(200).json({
            success: true,
            message: "Record created successfully!",
            data: dbRes
        })
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(422).json({
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

const updateData = async (req, res, schema) => {
    try {

        if (schema.modelName === "Category") {

            const rules = {
                name: "sometimes|sting|min:2|max:100",
                description: "sometimes|string|max:500"
            };

            const validation = new Validator(req.body, rules);

            if (validation.fails()) {
                return res.status(422).json({
                    success: false,
                    errors: Objcet.keys(validation.errors.all()).map(field => ({
                        field,
                        message: validation.errors.first(field)
                    }))
                });
            }

        }
        const id = req.params.id;
        const data = req.body;
        const dbRes = await service.updateRecord(id, data, schema);
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
        res.status(400).json({
            success: false,
            message: "Internal server error!",
            error: err.message
        });
    }
};

const deleteData = async (req, res, schema) => {
    try {
        const id = req.params.id;
        const dbRes = await service.deleteRecord(id, schema);
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