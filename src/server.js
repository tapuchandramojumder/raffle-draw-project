const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
app.use([morgan('dev'),cors(),express.json()])

app.get('/health',(_req,res)=>{
    res.status(200).json({message:'Successful'})
})

app.use((_req,_res,next)=>{
    const error = new Error('Resource Not Found')
    error.status = 404;
    next(error)
})



app.use((error,_req,res,_next)=>{
    if(error.status){
        return res.status(error.status).json({message:error.message})
    }
    res.status(500).json({message:"something went wrong"})
})

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('Server is listening on Port:',port)
})