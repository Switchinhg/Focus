
import express from 'express'
import mongoose from 'mongoose'
import User from '../model/UserModel.js'

/* Hash Password */
import bcrypt from 'bcrypt'
const saltRounds = 10

/* --- */
const userRouter = express.Router();


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
                    return res.send({"success":true,response})
                }else{
                    console.log('no logeado')
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
                    const newUser = new User({email, password, role})
                    newUser.save().then(()=>console.log("usuario Creado", newUser))
                    /* Crear JWT */
                    return res.send({"success":true})

                })
            }catch{
                return res.send({"success":false, err})
            }
        })

        
        
    }
})






export default userRouter