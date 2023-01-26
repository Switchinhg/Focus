import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { usarCart } from '../../Context/CartContext'


export default function GameDetail() {
    const [loading,setLoading] = useState(true)
    const [dis,setDisabled] = useState(false)
    const [game, setGame] = useState()
    const {id} = useParams()

    const {cart,addToCart,clearCart,deleteProd,totalCost} = usarCart()

    /* Add to cart */

    console.log("cart en gameDetail")
    console.log(cart)

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
                console.log('entre en find')
            }else{
                console.log('NO entre en find')
                setDisabled(false)
            }
        }
        getGame()

        setLoading(false)


    },[])

    const agregarJuego = (id) =>{
        setDisabled(true)
        addToCart(id)
    }
    const sacarJuego = (id)=>{
        setDisabled(false)
        deleteProd(id)
    }
 


  return (
    <div className='gameDetail'>
        {loading?
            <h3>Loading...</h3>
        :
            game?
            <div className='game'>
                <div className="imgySpecs">
                    <div>
                        {/* poner Carousel */}
                        <img src={game.img.gameFootage} alt="" />
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
                        </div>
                        <div className="description">
                            {game.description}
                        </div>
                    </div>
                    <div className="tagsydate">

                        <div className="tags">
                            <p className='tag'>{game.tags.newIn??'NEW IN'}</p>
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