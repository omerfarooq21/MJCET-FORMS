require('dotenv').config()
const {json} = require('express')
const express = require('express')
const app = express()
const path = require('path')
const { logger ,logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT||3000
console.log(process.env.NODE_ENV)

connectDB()
app.use(logger)
app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname,'/public')) )
app.use('/',require('./routes/root'))
// app.use('/Students',require('./routes/studentRoutes'))
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }
    else if(req.accepts(json)){
        res.json(({message:'404 NOT FOUND'}))
    }
    else{
        res.type('txt').send('404 NOT FOUND')
    }
})
app.use(errorHandler)
mongoose.connection.once('open' ,()=>{
    console.log(`Connected to Data baseB`)
    app.listen(PORT ,() =>
    console.log(`server is running on the port ${PORT}`)
    )
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents (`${err.name}: ${err.code} \t ${err.syscall} \t ${err.hostname}`,
    'mongoErrLog.log')
    })