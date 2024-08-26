"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errorMessages = errors.array().map((error) => {
            const obj = {};
            obj[error.path] = error.msg;
            return obj;
        });
        return res.status(400).json({ 'statusCode': 400, 'status': 'error', errors: errorMessages });
    };
};
exports.validate = validate;
//# sourceMappingURL=validator.js.map