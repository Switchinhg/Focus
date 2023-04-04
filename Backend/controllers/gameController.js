/* import schema */
import game from '../model/GameModel.js'

/* gameFunctions */
import gameFunction from '../persistencia/gameFunctions.js'

const createGame = (req,res)=>{
        const { name,img,video,description,price,tags,pcMinSpecs,releaseDate } = req.body
        gameFunction.createGame(name,img,video,description,price,tags,pcMinSpecs,releaseDate)
}

const getGamesID = async (req,res)=>{
    const {gamesID} = req.body
    const response = await gameFunction.getGamesID(gamesID)
    res.send(response)
        
}

const getAllGames = async (req,res)=>{
    const response =  await gameFunction.getAllGames()
    res.send(response)
}
const gameById = async (req,res)=>{
    const {id} = req.params
    const response = await gameFunction.gameById(id) 
    res.send(response)

}
const borrarJuego = async(req,res)=>{
    const { id } = req.params
    const response = await gameFunction.borrarJuego(id)
    res.send(response)
}
const swiperGames = async (req,res)=>{
    const response = await gameFunction.swiperGames()
    res.send(response)
}
const gameUnder = async (req,res)=>{
    const {percent} = req.params
    const response = await gameFunction.gamesUnder(percent)
    res.send(response)
}
export default {createGame, getGamesID,getAllGames,gameById,borrarJuego,swiperGames,gameUnder}