import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { usarCart } from '../../Context/CartContext'
import { UsarGame } from '../../Context/GameContext'
import { UsarAuth } from '../../Context/UserContext'
import {useNavigate} from 'react-router-dom'


export default function GameDetail() {
    const [loading,setLoading] = useState(true)
    const [dis,setDisabled] = useState(false)
    const [game, setGame] = useState()
    const {id} = useParams()

    const { usuarioActivo } = UsarAuth()
    const {cart,addToCart,deleteProd} = usarCart()
    const {DeleteGame} = UsarGame()

    /* redirect */
    const redirect = useNavigate()

    /* Add to cart */


    useEffect(()=>{
        async function getGame(){ 
            const gameFetch = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games/${id}`,{
                method:'GET'
            })
            const gameFetteched = await gameFetch.json()
            setGame(gameFetteched)
            const found = cart.find(el=>el.game === gameFetteched._id)
            if(found){
                setDisabled(true)
            }else{
                setDisabled(false)
            }
        }
        getGame()

        setLoading(false)


    },[])
    useEffect(()=>{
        console.log(usuarioActivo)
    },[usuarioActivo])

    const agregarJuego = (id) =>{
        setDisabled(true)
        addToCart(id)
    }
    const sacarJuego = (id)=>{
        setDisabled(false)
        deleteProd(id)
    }
 
    const BorrarJuego  = (id) =>{
        DeleteGame(id)
        setTimeout(() => {
            redirect('/games')
        }, 1000);

    }


  return (
    <div className='gameDetail'>
        {loading?
        /* Poner Spinner */
            <h3>Loading...</h3>
        :
            game?
            <div className='game'>
                <div className="imgySpecs">
                    <div>
                        {/* poner Carousel */}
                        <img src={ game.img.banner} alt="" />
                    </div>
                    <div>
                        <h4>PC min Specs</h4>
                        <p>Processor: {game.pcMinSpecs.processor}</p>
                        <p>RAM: {game.pcMinSpecs.ram}</p>
                        <p>Video: {game.pcMinSpecs.video}</p>
                        
                    </div>
                </div>
                <div className='gameData'>
                    <div>
                        <div className="nameyPrice">
                            <h1>{game.name}</h1>
                            <p>{game.price === 0? 'FREE' :"$ "+game.price}</p>
                            {console.log(usuarioActivo)}
                            {usuarioActivo?.role === "admin"?
                            <button className='btn' onClick={()=>BorrarJuego(game._id)}>Borrar Juego</button>
                            : null}
                        </div>
                        <div className="description">
                            {game.description}
                        </div>
                    </div>
                    <div className="tagsydate">

                        <div className="tags">
                        {game.tags?.newIn? <p className='tag'>NEW IN</p>:null}

                        </div>

                        <p>Release date: {game.releaseDate}</p>
                    </div>
                    <div className="buyNOW">
                        <button onClick={()=>sacarJuego(game._id)} disabled={!dis} >X</button>
                        <button  onClick={()=>agregarJuego(game._id)} disabled={dis} >Add to cart</button>
                    </div>
                </div>


            </div>:null
        }
    </div>
  )
}
