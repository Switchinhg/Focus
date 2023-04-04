import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
/* Mongoose */
const connectDB = async ()=>{
    try{
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_URI}/${process.env.DATABASE_NAME}`)
        const connection = mongoose.connection;
    
        connection.once('open', () => {
            console.log("Conectado a la base de MongoDB");
        });
    }catch(err){
        console.log("Error en la base de MongoDB" + err)
    }
}

export default connectDB