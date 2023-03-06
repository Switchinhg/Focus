
import express from 'express'
import mongoose from 'mongoose'
import User from '../model/UserModel.js'
import JWT from 'jsonwebtoken'
import nodemailer from 'nodemailer'
/* JWT Time */
    const expTime = "1w"
/* ----- */


import dotenv from 'dotenv'
import expressSession from 'express-session'
dotenv.config()

/* Nodemailer */
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})

/* --------- */

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
                    let mailOptions={
                        from:`${process.env.EMAIL}`,
                        to:email,
                        subject:'CUENTA CREADA EN FOCUSG',
                        text:'Creaste correctamente tu cuenta en FocusG! muchas gracias!'
                    }
                    transporter.sendMail(mailOptions, function(err,info){
                        if(err){
                        }
                        else{
                            console.log('Mail enviado', info.response)
                        }
                    })
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

/* Middleware protegido  check if user send JWT*/

export const checkAuth = (req, res, next)=>{
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

/* Check if is admin */
export const isAdmin =(req,res , next)=>{
    User.findOne({email:req.user.email},function(err,user){
        if( user.data.role === "admin"){
            next()
        }else{
            res.json({success:false,err:'usuario no es admin'})
        }
    })
}

userRouter.get('/users' , checkAuth ,(req,res)=>{
    User.findOne({email:req.user.email},function(err,user){
        let usuario = {
            role: user.data.role,
            img: user.data.img,
            username: user.data.username,
            phone: user.data.phone,
            library: user.data.library,
            cart:user.data.cart,
            _id: user.data._id,
            email: req.user.email
        }

        res.send(usuario)
    })
})

/* cuando compra un juego, se le agrega a la libreria */
userRouter.post('/library', checkAuth , (req,res)=>{
    User.findOne({email:req.user.email},function(err,user){
        const games = req.body.infoGames
        if(err){
            return res.send({"success":false, err})
        }  

        games.map( game => {user.data.library.push(game._id)})

        user.save((err) => {
            if (err) {
              console.error(err);
            } else {
              res.send({success:true})
            }
          });
        
         
    })
})






export default userRouter