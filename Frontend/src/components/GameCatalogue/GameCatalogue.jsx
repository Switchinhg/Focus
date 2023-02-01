import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading';

export default function GameCatalogue() {
    const [games,setGames] = useState()

    useEffect( () => {
    document.title = 'Games - FocusG';

        async function getGames(){
            const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games`,{
                method:'GET'
            })
            setGames( await resp.json())

        }

        getGames()
        
        
    }, [])


    if(!games)return <Loading />
    
  return (
    <section className='gameCatalogue'>
        

        <div>TAGS - TAGS - TAGS - TAGS - TAGS - TAGS - TAGS </div>

        {games?games.map(e=>
        /* Agregar if active, en vez de borrar */
        <Link to={`/game/${e._id}`} key={e._id} className='game'>
            <div className='img'>
                <img src={e.img.banner} alt="" />
            </div>
            <div className='description'>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
            </div>
            <div className='price'>
                <p>{e.price === 0? 'FREE' :"$ "+e.price + " USD"}</p>
            </div>
        </Link>

            ):null}


    </section>
  )
}
