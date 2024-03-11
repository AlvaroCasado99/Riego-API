import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const connectDB = () =>  mongoose.connect(process.env.RIEGO_DB_URI)
    .then(()=>{
        console.log('Database connected')
    })
    .catch(err => {
        console.error(err)
    })

    // Buena practica para que si peta la API la conexion con mongo quede zombie
    process.on('uncaughtException', () => mongoose.connection.disconnect())

export default connectDB