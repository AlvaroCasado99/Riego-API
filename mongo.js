const mongoose = require("mongoose")
const dotenv = require('dotenv')

dotenv.config()

const {RIEGO_DB_URI, TEST_DB_URI, NODE_ENV} = process.env

const connectionString = NODE_ENV==="test"
    ? TEST_DB_URI
    : RIEGO_DB_URI

const connectDB = () =>  mongoose.connect(connectionString)
    .then(()=>{
        console.log(`Database ${NODE_ENV} connected`)
    })
    .catch(err => {
        console.error(err)
    })

    // Buena practica para que si peta la API la conexion con mongo quede zombie
    process.on('uncaughtException', () => mongoose.connection.close())

module.exports = { 
    connectDB 
}