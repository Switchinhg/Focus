
import express from 'express'
import { checkAuth, isAdmin } from './UsersRouter.js';

/* import schema */
import game from '../model/GameModel.js'
const ProductRouter = express.Router();

/* Middleware is admin? */


ProductRouter.post('/games' ,checkAuth,isAdmin, (req,res)=>{
    const { name,img,video,description,price,tags,pcMinSpecs,releaseDate } = req.body

    try{
        const newProd = new game({name,img,video,description,price,tags,pcMinSpecs,releaseDate})
        newProd.save().then(e=>console.log('Juego Creado y guardado'))
    }catch{
    }

})



ProductRouter.post('/games/cart', (req,res)=>{
    const {gamesID} = req.body
    
    game.find({_id: { $in: gamesID }}, function(err,games){

        if(err){
            res.send({"success":false,err})
        }

        res.send(games)
        
    })

})




ProductRouter.get('/games', (req,res)=>{
        game.find({}, function(err,games){

            if(err){
                res.send({"success":false,err})
            }


            res.send(games)
            
        })
})
ProductRouter.get('/games/:id',(req,res)=>{
    const {id} = req.params
    game.findById(id, function(err,game){
        if(err){
        }
        res.send(game)
    })

})


export default ProductRouter