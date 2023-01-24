import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type:String, required:false}
  });

  const User = mongoose.model('users', userSchema);

  export default User