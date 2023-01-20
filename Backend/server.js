import express from 'express'


/* Routers---------- */
/* Productos */
import ProductRouter from './Routers/ProductRouter.js'
/* Usuarios */

/* ----------------- */
/* Inicializamos express */
const app = express()
/* Port */
const PORT = process.env.PORT || 8080
/* Server on */
const server= app.listen(PORT, ()=>console.log('Servidor inicializado en el puerto', PORT))

app.use(express.urlencoded({extended:true}))
app.use(express.json())




app.use('/api', ProductRouter)