import Joi from "joi";


/**
 * Validator login form
 */
const LoginValidator = Joi.object({
    userName: Joi.string().min(6).max(15).required(),
    password: Joi.string().required()
});



export default LoginValidator;
