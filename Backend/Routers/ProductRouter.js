
import express from 'express'
import { checkAuth, isAdmin } from './UsersRouter.js';

/* import schema */
import game from '../model/GameModel.js'
const ProductRouter = express.Router();

/* Middleware is admin? */


ProductRouter.post('/games' ,checkAuth,isAdmin, (req,res)=>{
    const { name,img,video,description,price,tags,pcMinSpecs,releaseDate } = req.body
    // console.log(req.body)


    try{
        const newProd = new game({name,img,video,description,price,tags,pcMinSpecs,releaseDate})
        console.log('juego creado', newProd)
        newProd.save().then(e=>console.log('Juego Creado y guardado'))
    }catch{
        console.log('errrorrrrrrrrr')
    }

})
ProductRouter.get('/games', (req,res)=>{
        game.find({}, function(err,games){

            if(err){
                console.log('errorrr')
                res.send({"success":false,err})
            }


            res.send(games)
            
        })
})


export default ProductRouter