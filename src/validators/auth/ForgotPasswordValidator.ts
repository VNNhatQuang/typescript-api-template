import Joi from "joi";


/**
 * Schema validate api send code
 */
const SendCodeValidator = Joi.object({
    email: Joi.string().email().required()
}).unknown(true);

/**
 * Schema validate api verify code
 */
const VerifyCodeValidator = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.number().integer().required()
}).unknown(true);

/**
 * Schema validate api reset password
 */
const ResetPassword = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.number().integer().required(),
    newPassword: Joi.string().required(),
    newPasswordConfirm: Joi.string().valid(Joi.ref('newPassword')).required()
}).unknown(true);



export { SendCodeValidator, VerifyCodeValidator, ResetPassword };
