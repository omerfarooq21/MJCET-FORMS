const {json} = require('express')
const express = require('express')
const app = express()
const path= require('path')
const { logger} = require('./middleware/logger')
const PORT = process.env.PORT||3000

app.use(logger)
app.use(express.json())
app.use('/', express.static(path.join(__dirname,'/public')) )
app.use('/',require('./routes/root'))
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
app.listen(PORT ,() =>
console.log(`server is running on the port ${PORT}`)

)