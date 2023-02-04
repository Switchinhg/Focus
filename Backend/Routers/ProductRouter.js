
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

    console.log(id)
    game.findByIdAndDelete(id,function(err,games){
        if(err){
            res.send({"success":"false",err})
            console.log("Juego no borrado", err)

        }
        res.send({"success":true})
        console.log("juegoBorrado", games)

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


    // game.find(
    //     { $match:{ price: { $gt: 0, $lt: percent } }},
    //     { $sample: { size: 2 } },function(err,games){
    //         if(err){
    //             res.send({"success":"false",err})
    //             console.log("Juego no borrado", err)
    //         }
    //         res.send({"success":true})
    //         console.log("juegoBorrado", games)
    // })
    game.aggregate([
        { $match: { price: { $gt: 0, $lt: Number(percent) } } },
        { $sample: { size: 10 } }
    ], function(err, games) {
        if (err) {
            console.log("Error retrieving games:", err);
            return;
        }
        console.log("Random games:", games);
    });
    

})

export default ProductRouter