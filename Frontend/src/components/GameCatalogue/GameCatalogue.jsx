import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function GameCatalogue() {
    const [games,setGames] = useState()

    useEffect( () => {

        async function getGames(){
            const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games`,{
                method:'GET'
            })
            setGames( await resp.json())

        }

        getGames()
        
        
    }, [])


    if(!games)return <h1>Cargando...</h1>
    
  return (
    <section className='gameCatalogue'>
        

        <div>TAGS - TAGS - TAGS - TAGS - TAGS - TAGS - TAGS </div>

        {games?games.map(e=>
        <Link to={`/game/${e._id}`} key={e._id} className='game'>
            <div className='img'>
                <img src={e.img.store} alt="" />
            </div>
            <div className='description'>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
            </div>
            <div className='price'>
                {e.tags?.newIn? <p>NEW IN</p>:null}
                <p>$ {e.price} USD</p>
            </div>
        </Link>

            ):null}


    </section>
  )
}
