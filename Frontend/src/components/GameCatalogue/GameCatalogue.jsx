import React, { useState,useEffect } from 'react'

export default function GameCatalogue() {
    const [games,setGames] = useState()

    useEffect( () => {

        async function getGames(){
            const resp = await fetch('http://localhost:8080/api/games',{
                method:'GET'
            })
            setGames( await resp.json())

        }

        getGames()
        
        
    }, [])

    console.log(games)

    if(!games)return <h1>Cargando...</h1>
    
    console.log(games)
  return (
    <section className='gameCatalogue'>
        

        <div>TAGS - TAGS - TAGS - TAGS - TAGS - TAGS - TAGS </div>

        {games?games.map(e=>
        <div key={e._id} className='game'>
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
        </div>

            ):null}


    </section>
  )
}
