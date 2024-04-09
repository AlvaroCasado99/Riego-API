
const express = require('express')
// const dotenv = require('dotenv')
// const mongoose = require('mongoose')
// const cors = require('cors')

// const {connectDB} = require('./mongo')
// const {notFound} = require('./middlewares/notFound.middleware')

// const scheduleRouter = require('./routers/schedule.router').router
// const userRouter = require('./routers/user.router').router

// Express main application
const app = express()

// // Me conecto a la base de datos de mongo (lo hago aquí porque simpre se carga este fichero al llegar una peticion)
// connectDB()

// //Middlewares
// app.use(express.json())   // Body parser: poder recibir req con body JSON
// app.use(cors())         // CrossOrigin...: necesario para el envio de datos JSON (entre otros)

// // Routers (Controllers)
// app.use('/schedule', scheduleRouter)


// // End points
// app.get("/", (req, res) => res.send("Express on Vercel"));

// // 404 Error handler
// app.use(notFound)

// const PORT = process.env.PORT
// const server = app.listen(PORT, () => {
//     console.log(`Application is up. GO to http://localhost:${PORT}`)
// })

const server = "tus muertos pisados"

module.exports = {
    app, 
    server
}