require('dotenv').config()
const cloudinary = require("cloudinary");

import express,{Application,Request,response} from 'express'
import cors from 'cors'
import "dotenv/config"
const dataBase = require('./index')
import authUser from './routes/authUser'
// import admin from './routes/admin'
import product from './routes/product'
// import user from './routes/user'


const app:Application = express()

app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:3000","https://www.smartshoping.club","https://smartshoping.club"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
      }
))


app.use('/auth',authUser)
// app.use('/api/admin',admin)
app.use('/product',product)
// app.use('/api/user',user)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

dataBase.startServer()

export{app}
