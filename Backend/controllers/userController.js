/* imports */
import mongoose from 'mongoose'
import User from '../model/UserModel.js'
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



const loginOcrearCuenta = async function(req,res){
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
}



const getUsers = (req,res)=>{
    console.log('entre en getUsers')
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
}
/* middleware */
const  library = async (req,res)=>{
        const games = req.body.infoGames.map( game =>game._id)
    
        User.findOneAndUpdate(
            { email: req.user.email }, // Search criteria
            { $push: { "data.library": {$each: games} } }, // Update data
            function(err, user) {
              if (err) {
                console.error(err);
              } else {
                res.send({success:true})
              }
            }
          );
    
    
}
export default {loginOcrearCuenta, getUsers, library}