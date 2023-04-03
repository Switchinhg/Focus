
import express from 'express'
import checkAuth from '../middlewares/checkAuth.js';
import isAdmin from '../middlewares/isAdmin.js';
import gameController from '../controllers/gameController.js';

const ProductRouter = express.Router();

/* Save new game */
ProductRouter.post('/games' ,checkAuth,isAdmin, gameController.createGame)
/* get gameS by ID */
ProductRouter.post('/games/cart', gameController.getGamesID)
/* Get all games */
ProductRouter.get('/games', gameController.getAllGames)
/* Get game by ID */
ProductRouter.get('/games/:id',gameController.gameById)
/* Delete Game */
ProductRouter.delete('/games/:id',checkAuth,isAdmin, gameController.borrarJuego)
/* Swiper Games */
ProductRouter.get('/swiper-games', gameController.swiperGames)
/* Games under percentage */
ProductRouter.get('/games-under/:percent', gameController.gameUnder)

export default ProductRouter