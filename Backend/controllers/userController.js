/* imports */
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
/*  secret Key */
const  secretKey = process.env.SECRET_KEY

/* Hash Password */
import bcrypt from 'bcrypt'
const saltRounds = 10
/* --- */
/* JWT Time */
const expTime = "1w"
/* ----- */
/* Nodemailer */
import nodemailer from 'nodemailer'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})

/* --------- */
import userFunctions from '../persistencia/userFunctions.js'


const loginOcrearCuenta = async function(req,res){
    const {email, password, action} = req.body

    if(action === "login"){
        
        // LOGIN
        const user = await userFunctions.buscarUsuarioPorEmail(email) 
        if(user.success === true){
            bcrypt.compare(password, user.user.password,(function(err, response){
                if(response){   
                    
                    console.log('logeado')
                    /* crear JWT */
                    const timestamp = Date.now().toLocaleString()
                    const JasonWebToken = JWT.sign({email,timestamp},secretKey,{expiresIn:expTime})
                    /* crear session y asociarlo con el jwt del user */
                    req.session.user = {JasonWebToken}
                    
                    return res.send({"success":true, JasonWebToken})
                }else{
                    return res.send({"success":false,err})

                }
            })) 
        }
        


    }else{

        // REGISTER

        try{
            //todo ARREGLAR ESTO
            /* busca alguna cuenta con este email */
            const user = await userFunctions.buscarUsuarioPorEmail(email) 
            /* 
                Si retorna true significa que hay usuario, entonces no debe crear la cuenta 
                pero si retorna false, segnifica que no encontro, entonces si creo la cuenta
            */
           console.log(user)
            if(user.success === true){
                return res.send({"success":false,"err":"Usuario ya existe"})
            }
            if(user.err)return res.send(user.err)
            /* encripta la contraseña */
            bcrypt.hash(password,saltRounds , function(err, criptedPassword){
                /* Crea usuario */
                console.log('antes de funtions')
                userFunctions.nuevoUsuario(email, criptedPassword).then(response=>{
                    if(response.success === true){
                        /* Crear JWT */
                        const timestamp = Date.now()
                        const JasonWebToken = JWT.sign({email,timestamp},secretKey,{expiresIn:expTime})
                        /* configura el mail */
                        let mailOptions={
                            from:`${process.env.EMAIL}`,
                            to:email,
                            subject:'CUENTA CREADA EN FOCUSG',
                            text:'Creaste correctamente tu cuenta en FocusG! muchas gracias!'
                        }
                        /* manda el mail */
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
    
                    }
                })
            })
        
        }catch(err){
            return res.send({"success":false, err})

        }
    }
}


const getUsers = async(req,res)=>{
    const response = await userFunctions.buscarUsuarioPorEmail(req.user.email)

        if (response.success === true){
            let usuario = {
                role: response.user.data.role,
                img: response.user.data.img,
                username: response.user.data.username,
                phone: response.user.data.phone,
                library: response.user.data.library,
                cart:response.user.data.cart,
                _id: response.user.data._id,
                email: req.user.email
            }
            res.send(usuario)
        }
}
/* middleware */
const  library = async (req,res)=>{
        const games = req.body.infoGames.map( game =>game._id)
        const cambiar = await userFunctions.buscarYCambiar(req.user.email, games)
        res.send(cambiar) 
}
export default {loginOcrearCuenta, getUsers, library}