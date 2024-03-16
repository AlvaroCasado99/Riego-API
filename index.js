import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import connectDB from './mongo.js'
import schedule from './routers/schedule.router.js'
import notFound from './middlewares/notFound.middleware.js'

// Express main application
const app = express()

// Me conecto a la base de datos de mongo (lo hago aquí porque simpre se carga este fichero al llegar una peticion)
connectDB()
dotenv.config()

//Middlewares
app.use(express.json())   // Body parser: poder recibir req con body JSON
app.use(cors())         // CrossOrigin...: necesario para el envio de datos JSON (entre otros)

// Routers (Controllers)
app.use('/schedule', schedule)


// End points
app.get("/", (req, res) => res.send("Express on Vercel"));

app.get('/hola', (req, res) => {
    res.status(200).json({
        msg: 'hola amigo'
    })
})

// 404 Error handler
app.use(notFound)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Application is up. GO to http://localhost:${PORT}`)
})

export {app, server}