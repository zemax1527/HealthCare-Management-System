const authService = require('../services/auth.service')

const register = async (req, res, next)=>{
    try{
    const{ fullname, email, password, role} = req.body
    const user = await authService.register({
        fullname,
        email,
        password,
        role
    })
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user
    })
    }catch(error){
        next(error)
    }
}

module.exports = {register}