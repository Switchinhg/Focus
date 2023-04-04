import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

/* Import Router */
import ProductRouter from './Routers/ProductRouter.js'
import UserRouter from './Routers/UsersRouter.js'
/* ----------------- */

/* Import and Connect MongoDB */
import connectDB from './persistencia/connectDB.js'
connectDB()
/* ----------------- */

/* Inicializamos express */
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

/* Port */
const PORT = process.env.PORT || 8080

/* Server on */
const server= app.listen(PORT, ()=>console.log('Servidor inicializado en el puerto', PORT))

/* Routes */
app.use('/api', ProductRouter)
app.use('/api', UserRouter)