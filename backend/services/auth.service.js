const bcrypt = require('bcrypt')
const User = require('../model/user.model')

const register = async ({fullname, email, password, role}) =>{
    const existingUser = await User.findOne({email})
    if(existingUser){
        const error = new Error('Email already registered')
        error.statusCode = 409
        throw error
    }
    const hashPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        fullname,
        email,
        password : hashPassword,
        role : role || 'patient',
        authProvider : 'local'
    })
    const safeUser = user.toObject()
    delete safeUser.password
    return safeUser
}

module.exports = { register }