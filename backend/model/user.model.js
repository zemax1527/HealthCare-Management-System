const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            trim : true
        },
        lastname : {
            type : String,
            required : true,
            trim : true
        }    
    },
    email : {
        unique : true,
        type : String,
        lowercase : true,
        required : true,
        trim : true,
    },
    password : {
        type : String ,
        select : false
    },
    loginId : {
        unique : true,
        type : String,
        sparse : true
    },
    authProvider : {
            type : String,
            enum : ['local','google'],
            required : true
    },
    role : {
        type : String,
        enum : [
            'patient',
            'healthcare_worker',
            'doctor',
            'admin'
        ],
        default : 'patient',
        required : true
    },
    isActive : {
        type :Boolean,
        default : true
    }

},
{
    timestamps: true
})

const userModel = mongoose.model('User',userSchema)
module.exports = userModel