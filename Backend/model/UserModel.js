import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    data:{type:Object, default:{
      role:'user',
      img:'',
      username:'',
      phone:''

    },
    cart:{type:Object,required:false}},
  });

  const User = mongoose.model('users', userSchema);

  export default User