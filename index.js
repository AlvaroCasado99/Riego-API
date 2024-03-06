import express from 'express'
import cors from 'cors'

import schedule from './routers/schedule.router'

// Express main application
const app = express()

//Middlewares
app.use(express.json)   // Body parser: poder recibir req con body JSON
app.use(cors())         // CrossOrigin...: necesario para el envio de datos JSON (entre otros)

// Routers
app.use('/schedule', schedule)

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get('/hola', (req, res) => {
    req.status(200).json({
        msg: 'hola amigo'
    })
})

// 404 Error catcher
app.use((request, response) => {
    response.status(404).json({
        error: "Not Found"
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Application is up. GO to http://localhost:${PORT}`)
})