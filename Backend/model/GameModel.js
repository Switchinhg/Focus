import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: Object, required: true, default:{
        banner:'',
        store:'',
        gameFootage:''
    } },
    video:{type:String, required:false},
    description:{type:String, required:true},
    price:{type:Number, required:true,default:0},
    tags:{type:Object,required:false,default:{
        newIn:true,
        sale:{sale:false,
            percent:0,
            until:Date.now()
        },
    }},
    pcMinSpecs:{type:Object,required:true, default:{
        processor:"",
        ram:"",
        video:""
    }},
    releaseDate:{type:Date, required:true}
    
  });

  const game = mongoose.model('games', gameSchema);

  export default game