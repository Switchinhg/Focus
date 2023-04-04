import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    message:{type:String,required:true},
    date:{type:String,required:true},
  });

  const Message = mongoose.model('messeges', messageSchema);

  export default Message