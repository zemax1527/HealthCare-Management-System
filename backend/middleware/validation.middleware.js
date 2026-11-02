
const validateMiddleware = (schema) => {
     return (req, res, next) => {
         const {error , value } = schema.validate(req.body,{
            abortEarly : false,
            stripUnknown : true
         })
        if(error){
            return res.status(400).json({
                success : false,
                message : 'Validation Failed',
                error : error.details.map((detail)=>{
                    return detail.message
                })
            })
        }
        req.body = value
        next()
     }
} 

module.exports = validateMiddleware