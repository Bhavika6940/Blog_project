
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

        // User validation
        if (Model.name === "User") {
            const rules = {
                username: "required|string|min:3|max:30",
                email: "required|email",
                password: "required|string|min:6",
                role: "in:Admin,Author,Reader",
                Profile: "sometimes|string"

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
        const dbRes = await service.createNewRecord(data, Model);
        res.status(200).json({
            success: true,
            message: "Record created successfully!",
            data: dbRes
        })
    }
    catch (err) {
        if (err.name === "SequelizeUniqueConstraint" || err.original?.code === "ER_DUP_ENTRY") {
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

const updateData = async (req, res, Model) => {
    try {

        if (Model.name == "User") {
            const rules = {
                username: "sometimes|string|min:3|max:30",
                email: "sometimes|email",
                password: "sometimes|string|min:6",
                role: "sometimes|in:Admin,Author,Reader",
                Profile: "sometimes|string"
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
        res.status(400).json({
            success: false,
            message: "Internal server error!",
            error: err.message
        });
    }
};

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