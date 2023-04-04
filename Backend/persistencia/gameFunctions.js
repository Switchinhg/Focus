/* import schema */
import game from "../model/GameModel.js";

const createGame= (name,img,video,description,price,tags,pcMinSpecs,releaseDate)=>{
    try{
        const newProd = new game({name,img,video,description,price,tags,pcMinSpecs,releaseDate})
        newProd.save().then(e=>'Juego Creado y guardado')
    }catch(err){
        return err
    }
}
const getGamesID = async(gamesID)=>{
    try {
        const games = await game.find({_id: { $in: gamesID }})
        return games
    } catch (err) {
        return err        
    }
}
const getAllGames = async()=>{
    try {
        const games =await game.find({})
        return games
    } catch (err) {
        return err
    }
    
}
const gameById = async(id)=>{
    try {
        const g4me = await game.findById(id)
        return g4me
    }catch(err){
        console.log(err)
    }
}
const borrarJuego = async(id)=>{
    try {
        const g4me = await game.findByIdAndDelete(id)
        return {"success":true}
    } catch (err) {
        return {"success":false}
    }
}
const swiperGames = async()=>{
    let games = []
    games  = await game.aggregate([
        { $match: { "tags.newIn": true } },
        { $sample: { size: 5 } }],function(err,games){
            return games
    })
    // TODO hacer funcionar las etiquetas de sale
    // const gamesSale = await game.aggregate([
    //     {$match:{"tags.sale.sale":false}},
    //     {$sample:{size:1}}],function(err,games){
    //         return games
    // })

    games = [...games/* ,gamesSale */]

    return {"success":true,games}
}
const gamesUnder = async(percent)=>{
    try {

        const games = await game.aggregate([
            { $match: { price: { $gt: 0, $lt: Number(percent) } } },
            { $sample: { size: 5 } }
        ])
        return {success: true,games} 

    } catch (err) {
        return {"success":false}
    }
}

export default {createGame,getGamesID,getAllGames,gameById,borrarJuego,swiperGames,gamesUnder}