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
        
        console.log('entro en addGame')
        const resp = await fetch('http://localhost:8080/api/games',{
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
      console.log("data")
      console.log(data)
      return data
  }
  
  /* Funcion de RemoveGame */
  async function RemoveGame(email,password){
     const resp = await fetch('http://localhost:8080/api/users',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email,
        password
      })
    })
    const data = await resp.json()
    console.log("data")
    console.log(data)
    if(data.success === true){
      await getUserData(data.JasonWebToken)
    }
    return data
  }

  /* Funcion de Editar juego */
  async function EditGame(){
    console.log('entre en getUserData')
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
        RemoveGame,
        EditGame,
    }




  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  )
}
