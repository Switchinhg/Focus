import User from "../model/UserModel.js"


async function buscarUsuarioPorEmail(email){
    try{
        const user = await User.findOne({email})
        if(!user)return {"success":false, "response":"Usuario no encontrado"}
        return {"success":true, user}

    }catch(err){
        return {"success":false, err}
    }
}
async function nuevoUsuario(email,password){
    try{
        const user = new User({email,password})
        await user.save()
        
        return {"success":true, user}
    }catch(err){
        console.log(err)
    }
}

async function buscarYCambiar(mail, gameArray){
    try{
        const recibido = await User.findOneAndUpdate(
            { email: mail }, // Search criteria
            { $push: { "data.library": {$each: gameArray} } }
            )
            return {"success":true, recibido}
    }catch(err){
        return {"success":false, err}
    }
}


export default {buscarUsuarioPorEmail, nuevoUsuario, buscarYCambiar}