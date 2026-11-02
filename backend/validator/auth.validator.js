const joi = require('joi')

const registerSchema = joi.object({
    fullname : joi.object({
        firstname : joi.string().trim().min(2).max(20).required(),
        lastname : joi.string().trim().min(2).max(20).required()
    }).required(),
    email : joi.string().trim().lowercase().email().required(),
    password : joi.string().min(6).max(18).required(),
    role : joi.string().valid('patient','healthcare_worker','doctor').default('patient')
})

module.exports = registerSchema