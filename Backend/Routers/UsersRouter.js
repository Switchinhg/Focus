
import express from 'express'
import mongoose from 'mongoose'
import User from '../model/UserModel.js'
import JWT from 'jsonwebtoken'
/* JWT Time */
    const expTime = "1w"
/* ----- */
import dotenv from 'dotenv'
import expressSession from 'express-session'
dotenv.config()


/* Hash Password */
import bcrypt from 'bcrypt'
const saltRounds = 10
/* --- */
/*  secret Key */
const  secretKey = process.env.SECRET_KEY

const userRouter = express.Router();


/* Inicializar express session */

userRouter.use(expressSession({
    secret:secretKey,
    resave:false,
    saveUninitialized:false,
    cookie: {
        secure: true, // serve secure cookies
        httpOnly: true, // don't allow client-side JavaScript to access the cookie
        maxAge: 60000 * 60 // expire the session after 1 minute
    }
}))


userRouter.post('/users', (req,res)=>{
    const {email, password, action} = req.body
    let role = "user"

    if(action === "login"){
        
        // LOGIN
        User.findOne({email:email},function(err, user){
            if(err){
                return res.send({"success":false, err})
            }
            if(!user){
                return res.send({"success":false, "error":"Usuario no encontrado"})
            }
            bcrypt.compare(password, user.password,(function(err, response){
                if(response){
                    console.log('logeado')
                    /* crear JWT */
                    const timestamp = Date.now()
                    const JasonWebToken = JWT.sign({email,timestamp},secretKey,{expiresIn:expTime})
                    /* crear session y asociarlo con el jwt del user */
                    req.session.user = {JasonWebToken}

                    console.log(req.session.user)
                    return res.send({"success":true, JasonWebToken})
                }else{
                    return res.send({"success":false,err})
                }
            })) 
        })


    }else{
        // REGISTER
        bcrypt.hash(password,saltRounds , function(err, password){
            try{
                User.findOne({email:email},function(err, user){
                    if(user){
                        return res.send({"success":false,"err":"Usuario ya existe"})
                        
                    }
                    const newUser = new User({email, password})
                    newUser.save().then(()=>console.log("usuario Creado", newUser))
                    /* crear JWT */
                    const timestamp = Date.now()
                    const JasonWebToken = JWT.sign({email,timestamp},secretKey,{expiresIn:expTime})
                    /* crear session y asociarlo con el jwt del user */
                    req.session.user = {JasonWebToken}
                    return res.send({"success":true, JasonWebToken})

                })
            }catch{
                return res.send({"success":false, err})
            }
        })

        
        
    }
})

/* Middleware protegido */

const checkAuth = (req, res, next)=>{
    /* buscar header auth con el jwt */
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message:'unauthorized'})
    }
    /* Verificar JWT */
    try {
            const token = authHeader.split(' ')[1];
            const verif = JWT.verify(token, secretKey)

            if (verif.exp < Date.now() / 1000){
                /* JWT expirado */
                
            }else{
                /* se pasa el jwt para la ruta */
                req.user = verif
    
                next()
            }

         
    }
    catch{
        return res.status(401).json({message:'unauthorized'})
    }
}

userRouter.get('/users' , checkAuth ,(req,res)=>{
    User.findOne({email:req.user.email},function(err,user){
        /* Poner que devuelva el user.data */
        user.data.email=req.user.email
        res.send(user.data)
    })
})






export default userRouter