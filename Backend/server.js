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
import messageFunctions from './persistencia/messageFunctions.js'

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


/* mensajes */


/* SV */
import {Server} from 'socket.io'
const io = new Server(server, {
    cors: {
      origin: `*`,
      methods: ['GET', 'POST']
    }
  });

io.on('connection', async(socket)=>{
    /* siempre que se conecte un usuario recibe todos los mensajes */
    console.log('Un cliente se ha conectado');

    /* le envia el historial al usuario */
    const mensajes = await messageFunctions.buscarMensages()
      socket.emit('historial', mensajes)

    /* al recibir mensaje nuevo */
    socket.on('mensaje' ,async (data) =>{
        let hoy = new Date().toLocaleDateString()
        await messageFunctions.guardarMensaje(data.sender,data.message,hoy)
        io.sockets.emit('mensajes', data)
    })
})

