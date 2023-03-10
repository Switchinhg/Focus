import React,{ createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext([]);
export const UsarAuth = () => useContext(AuthContext);

export default function UserContext({children}) {
    const [loading, setLoading] = useState(true)
    const [usuarioActivo, setUsuarioActivo] = useState();


    useEffect(() => {
      /* Mandar JWT */
      /* TODO get and validate jsw before sending */
      getUserData(localStorage.getItem('JWT'))

      setLoading(false)
    }, [])
    
    /* Funcion de Login */
    async function Login(email,password){
      const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/users`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          email,
          password,
          action:"login"
        })
      })
      const data = await resp.json()
      if(data.success === true){
       await getUserData(data.JasonWebToken)
      }
      return data
  }
  
  /* Funcion de Registro */
  async function Register(email,password){
     const resp = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/users`,{
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
    if(data.success === true){
      await getUserData(data.JasonWebToken)
    }
    return data
  }

  async function getUserData(JWT){
    const userDataPre = await fetch(`${import.meta.env.VITE_APP_FETCH}/api/users`,{
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

  /* TODO Function change or delete user Data */



  /* ---------- */

  async function delog(){
    localStorage.removeItem('JWT')
    setUsuarioActivo('')
  }





    const value = {
      usuarioActivo,
      Login,
      Register,
      delog,
      getUserData
    }




  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
