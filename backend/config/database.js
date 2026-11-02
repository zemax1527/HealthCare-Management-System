const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('DataBase Connected')
    }
    catch(error){
        console.error('DataBase Failed : ', error.message)
        process.exit(1)
    }
}

module.exports = connectDB