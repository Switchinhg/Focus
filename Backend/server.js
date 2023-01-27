import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

/* Routers---------- */
/* Productos */
import ProductRouter from './Routers/ProductRouter.js'
import UserRouter from './Routers/UsersRouter.js'
/* Usuarios */

/* ----------------- */
/* Inicializamos express */
const app = express()
app.use(cors())
/* Port */
const PORT = process.env.PORT || 8080
/* Server on */
const server= app.listen(PORT, ()=>console.log('Servidor inicializado en el puerto', PORT))

/* Mongoose */
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/${process.env.DATABASE_NAME}`)
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Conectado a la base de MongoDB");
});

app.use(express.urlencoded({extended:true}))
app.use(express.json())




app.use('/api', ProductRouter)
app.use('/api', UserRouter)