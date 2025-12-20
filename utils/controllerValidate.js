const Validator = require('validatorjs');

module.exports = (data, rules) => {
    const validation = new Validator(data, rules);

    if (validation.fails()) {
        const errors = Object.keys(validation.errors.all()).map(field => ({
            field,
            message: validate.errors.first(field)
        }));
        return { valid: false, errors };
    }

    return { valid: true };
}