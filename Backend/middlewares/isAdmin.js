/* Check if is admin */
const isAdmin =(req,res , next)=>{
    User.findOne({email:req.user.email},function(err,user){
        if( user.data.role === "admin"){
            next()
        }else{
            res.json({success:false,err:'usuario no es admin'})
        }
    })
}

export default isAdmin