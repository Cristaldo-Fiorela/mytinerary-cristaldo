const joi = require('joi') 

const validator = (req, res, next) => { 

    const schema = joi.object({  
        firstName: joi.string()
            .max(20)
            .min(2)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'name: min 2 characters',
                'string.max': 'name: max 20 characters'}),
        lastName: joi.string()
            .min(2)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': '"last name": min 2 characters',
                'string.max': '"last name": max 20 characters'}),

        country: joi.string()
                .trim()
                .required(),

        userPhoto: joi.string()
                .trim()
                .required(),

        email: joi.string() 
            .email({minDomainSegments:2}) 
            .required() 
            .messages({ 
                'string.email' : '"mail": incorrect formant' 
                }),

        password: joi.string() 
            .min(8) 
            .pattern(new RegExp('[a-zA-Z0-9]')) 
            .required() 
            .messages({
                'string.min' : '"password" : min 8 characters',
                }),

        from: joi.string() 
            .required()
    })


    const validation = schema.validate(req.body.userData, {abortEarly:false}) 

    if (validation.error) { 
        return res.json({ 
            success: false, 
            from: 'validator', 
            message: validation.error.details,  
            test: validation
        })
    }
    next()
} 


module.exports = validator

