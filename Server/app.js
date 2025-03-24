import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/user.js'

dotenv.config()
const app=express()
const dbUrl=process.env.ATLASDB_URL

main().then(()=>
    {
console.log('Databse connected')
    }).catch((err)=>
    {
        console.log("Database connection error", err)
    })

async function main()
{
mongoose.connect(dbUrl)
}

app.listen(7080, ()=>
{
    console.log('Server is listening  on port 7080')
})

app.get('/', (req,res)=>
{
    res.send('Homepage')
})

app.use(cors())
app.use(bodyParser.json())
app.use('/user', userRoutes)

app.use(express.json({limit:"500mb",extended:true}))
app.use(express.urlencoded({limit:"500mb",extended:true}))
