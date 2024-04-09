
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const {connectDB} = require('./mongo')
const {notFound} = require('./middlewares/notFound.middleware')

const scheduleRouter = require('./routers/schedule.router').router
const userRouter = require('./routers/user.router').router

// Express main application
const app = express()

// Me conecto a la base de datos de mongo (lo hago aquí porque simpre se carga este fichero al llegar una peticion)
try{
    connectDB()
}catch(err){
    console.log("Con la base de datos")
}

//Middlewares
try{
    app.use(express.json())   // Body parser: poder recibir req con body JSON
    app.use(cors())         // CrossOrigin...: necesario para el envio de datos JSON (entre otros)
}catch(err){
    console.log("Con los middlewares")
}

// Routers (Controllers)
try{
    app.use('/schedule', scheduleRouter)
}catch(err){
    console.log("Con los schedules")
}


// End points
app.get("/", (req, res) => res.send("Express on Vercel"));

// 404 Error handler
app.use(notFound)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log(`Application is up. GO to http://localhost:${PORT}`)
})

module.exports = {
    app, 
    server
}