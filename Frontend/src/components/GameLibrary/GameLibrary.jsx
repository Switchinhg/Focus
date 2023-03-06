import { useState } from 'react'
import { useEffect } from 'react'
import { UsarAuth } from '../Context/UserContext'

export default function GameLibrary() {
    const [games,setgames]=useState()
    const {usuarioActivo} = UsarAuth()


    useEffect(() => {
        document.title = 'Game Library - FocusG';

    
        getGamesById()
        
        
    }, [])

    async function getGamesById(){
        const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games/cart`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('JWT')}`
            },
            body:JSON.stringify({
                gamesID:usuarioActivo.library
            })
          })
          const data = await resp.json()
          setgames(data)
    }
    
    if(!games || !usuarioActivo) return <h1>Cargando...</h1>
    /* Buscar los juegos del usuario */
  return (
    <div className='GameLibrary'>

        <div>
            <input type="text" name="" id="" />

{/* get all games from user's library */}
        </div>   
        <div>
            <div>
            {games.map(game =><div key={game._id} className='game' >

                <img  src={game.img.banner} alt="Game Image" />
                <p>{game.name}</p>
                </div>
            )}
            </div>
            <div>
                Install and other info
            </div>

        </div>


    </div>
  )
}
