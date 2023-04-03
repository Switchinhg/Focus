import express from 'express'

import dotenv from 'dotenv'
dotenv.config()

/* import controllador */
import userController from '../controllers/userController.js'
/* ------------------- */
/* import middlewares */
import checkAuth from '../middlewares/checkAuth.js'
import sessionMiddleware from '../middlewares/session.js'
/* ------------------- */


const userRouter = express.Router();


/* Inicializar express session */
userRouter.use(sessionMiddleware)

userRouter.post('/users', userController.loginOcrearCuenta)


userRouter.get('/users' , checkAuth , userController.getUsers)

/* cuando compra un juego, se le agrega a la libreria */
userRouter.post('/library', checkAuth ,userController.library)






export default userRouter