import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

dotenv.config()
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET','POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
const app =express()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})