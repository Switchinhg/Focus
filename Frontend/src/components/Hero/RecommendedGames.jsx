import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecommendedGames() {
    const [recGames, setRecGames] = useState()
    console.log("recGames")
    console.log(recGames)
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_APP_FETCH}/api/games-under/20`)
        .then(e=>e.json())
        .then(games=>setRecGames(games.games))
        },[])

        if(!recGames)return <></>
    
  return (

    <section className='recGames'>
        <h3>Recommended games under 20 USD</h3>
        <div className='gamesWrap'>

        {recGames.map(e=>
            <Link to={`/game/${e._id}`} className='game'>
            <div className='center'>
                <p >{e.name}</p>
                <p >{e.price} USD</p>
            </div>
            <img className='img' src={e.img.banner} alt="" />

        </Link>
        )}
        </div>
    </section>

    )
}
