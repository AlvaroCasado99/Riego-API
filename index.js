import cors from 'cors'
import express from 'express'

const app = express()

//Middlewares
app.use(express.json)   // Body parser: poder recibir req con body JSON
app.use(cors())         // CrossOrigin...: necesario para el envio de datos JSON (entre otros)

// Routers

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Application is up. GO to http://localhost:${PORT}`)
})