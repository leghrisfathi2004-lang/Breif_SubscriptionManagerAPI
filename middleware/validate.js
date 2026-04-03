const joi = require('joi');
const respond = require('../middleware/respond.js')

const validateUser = (req, res, next) => {
    const userShema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    const {errour} = userShema.validate(req.body);

    if (errour) 
        return respond(res, 400, errour.details[0].message);

    next();
}

const validateSub = (req, res, next) => {
    const subShema = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        billingCycle: joi.string().valid("monthly", "yearly").required()
    });

    const er = subShema.validate(req.body);

    if (!er) 
        return respond(res, 400, er.details[0].message);

    next();
}

module.exports = {validateSub, validateUser};