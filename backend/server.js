require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/database')
const port = process.env.PORT || 5000;

const serverStart = async ()=>{
    await connectDB()

    app.listen(port , ()=>{
        console.log('server is running on port');
        
    }  )
}

serverStart()