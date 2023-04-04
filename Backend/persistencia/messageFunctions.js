import MessageModel from '../model/MessageModel.js';


async function guardarMensaje(sender,message,date){
    try{
        const mensaje = new MessageModel({sender,message,date})
        await mensaje.save()
    }catch(err){
        console.log(err)
    }
}
async function buscarMensages(){
    try{
        const mensajes =await MessageModel.find({})
        return mensajes
    }catch(err){

    }
}

export default {guardarMensaje,buscarMensages}