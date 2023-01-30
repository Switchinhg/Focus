import React,{ createContext, useContext, useState, useEffect} from 'react'

const GameContext = createContext([]);
export const UsarGame = () => useContext(GameContext);

export default function GameContextProvider({children}) {
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        setLoading(false)
    }, [])
    

    
    /* Funcion de AddGame */
    async function AddGame(name,img,video,description,price,tags,pcMinSpecs,releaseDate){
        
        const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('JWT')}`
        },
        body:JSON.stringify({
          name,
          img,
          video,
          description,
          price,
          tags,
          pcMinSpecs,
          releaseDate
        })
      })
      const data = await resp.json()
      return data
  }
  
  /* Funcion de RemoveGame  TODO*/
  async function DeleteGame(id){
     const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/games/${id}`,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('JWT')}`
      },
    })
    // const data = await resp.json()
    if(resp.success === true){
      return "Game Deleted"
    }else{
      return "Game couldn't be deleted"
    }
  }

  /* Funcion de Editar juego */
  async function EditGame(){
    const userDataPre = await fetch('http://localhost:8080/api/users',{
      headers: {
        Authorization: `Bearer ${JWT}`
      }
    })
    const userData = await userDataPre.json()
    if(userData.message === "unauthorized"){
      localStorage.removeItem('JWT')
      setUsuarioActivo('')
      return userData
    }
    else{
      setUsuarioActivo(userData)
    }
  }





    const value = {
        AddGame,
        DeleteGame,
        EditGame,
    }




  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  )
}
