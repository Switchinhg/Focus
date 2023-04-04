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

/* ---------------------- EXPERIMENTAL ---------------------- */




/* mensajes */


/* SV */
import {Server} from 'socket.io'
const io = new Server(server, {
    cors: {
      origin: `${process.env.SERVER_DIR}`,
      methods: ['GET', 'POST']
    }
  });

io.on('connection', (socket)=>{
    /* siempre que se conecte un usuario recibe todos los mensajes */
    console.log('Un cliente se ha conectado');

    // mensajesjs.msg.getAll()
    // .then(data =>{
    //     usuario.emit('historial', data)
    // })

    socket.emit('historial', mensajes)


    /* al recibir mensaje nuevo */
    socket.on('mensaje' , (data) =>{
        console.log(data)
        // data.fecha = new Date().toLocaleString()
        // mensajesjs.msg.save(data)
        mensajes.push(data)
        io.sockets.emit('mensajes', data)
    })
    // const newProd = (prod) =>{io.sockets.emit('newProd', prod)}
    // exports.newProd = newProd
})


const mensajes = []