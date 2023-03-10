
import express from 'express'
import { checkAuth, isAdmin } from './UsersRouter.js';

/* import schema */
import game from '../model/GameModel.js'
const ProductRouter = express.Router();


/* Save new game */
ProductRouter.post('/games' ,checkAuth,isAdmin, (req,res)=>{
    const { name,img,video,description,price,tags,pcMinSpecs,releaseDate } = req.body

    try{
        const newProd = new game({name,img,video,description,price,tags,pcMinSpecs,releaseDate})
        newProd.save().then(e=>console.log('Juego Creado y guardado'))
    }catch{
    }

})


/* get gameS by ID */
ProductRouter.post('/games/cart', (req,res)=>{
    const {gamesID} = req.body
    
    game.find({_id: { $in: gamesID }}, function(err,games){

        if(err){
            res.send({"success":false,err})
        }

        res.send(games)
        
    })

})



/* Get all games */
ProductRouter.get('/games', (req,res)=>{
        game.find({}, function(err,games){

            if(err){
                res.send({"success":false,err})
            }


            res.send(games)
            
        })
})
/* Get game by ID */
ProductRouter.get('/games/:id',(req,res)=>{
    const {id} = req.params
    game.findById(id, function(err,game){
        if(err){
            res.send({"success":"false",err})
        }
        res.send(game)
    })

})

/* Borrar Juego */
ProductRouter.delete('/games/:id',checkAuth,isAdmin, (req,res)=>{
    const { id } = req.params

    game.findByIdAndDelete(id,function(err,games){
        if(err){
            res.send({"success":"false",err})

        }
        res.send({"success":true})

    })
})
ProductRouter.get('/swiper-games', async (req,res)=>{
    let games = []
    games  = await game.aggregate([
        { $match: { "tags.newIn": true } },
        { $sample: { size: 5 } }],function(err,games){
            return games
    })
    // console.log('games',games)


    // TODO hacer funcionar las etiquetas de sale
    // const gamesSale = await game.aggregate([
    //     {$match:{"tags.sale.sale":false}},
    //     {$sample:{size:1}}],function(err,games){
    //         return games
    // })

    games = [...games/* ,gamesSale */]

    res.send({"success":true,games})

})

ProductRouter.get('/games-under/:percent', async (req,res)=>{
    const {percent} = req.params

    game.aggregate([
        { $match: { price: { $gt: 0, $lt: Number(percent) } } },
        { $sample: { size: 5 } }
    ], function(err, games) {
        if (err) {
            res.send({success: false, err})
            return;
        }
        res.send({success: true, games})
    });
    

})

export default ProductRouter