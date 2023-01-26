import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'


export default function GameDetail() {
    const [loading,setLoading] = useState(true)
    const [game, setGame] = useState()
    const {id} = useParams()

    console.log(id)

    useEffect(()=>{
        async function getGame(){ 
            const gameFetch = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games/${id}`,{
                method:'GET'
            })
            setGame(await gameFetch.json())
        }
        getGame()

        setLoading(false)

        console.log(game)

    },[])

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

                        <p>{game.releaseDate}</p>
                    </div>
                    <div className="buyNOW">
                        <button>Buy NOW</button>
                        <button>Add to cart</button>
                    </div>
                </div>


            </div>:null
        }
    </div>
  )
}
