import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    data: {
      type: {
        role: { type: String, default: 'user' },
        img: { type: String, required: false },
        username: { type: String, required: false },
        phone: { type: String, required: false },
        library: {type:Array,default: []},
        cart:{type:Array,required:false},
      },
    }  
  });

  const User = mongoose.model('users', userSchema);

  export default User