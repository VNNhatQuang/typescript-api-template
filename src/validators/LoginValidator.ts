import Joi from "joi";


/**
 * Validator login form
 */
const LoginValidator = Joi.object({
    userName: Joi.string()
        .required()
        .min(6)
        .max(15)
        .pattern(/^[a-zA-Z][a-zA-Z0-9]{5,14}$/) // Ký từ đầu tiên phải là a-z hoặc A-Z, và chuỗi từ ký tự thứ 5 trở đi đến 14 phải chứa chỉ chữ cái hoặc số
        .messages({
            "string.pattern.base": "Value must start with a letter and can only contain letters and numbers"
        }),
    password: Joi.string()
        .required()
});



export default LoginValidator;
