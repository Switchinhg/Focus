import React,{ createContext, useContext, useState} from 'react'

export default function UserContext() {
    const [loading, setLoading] = useState(true)
    const [usuarioActivo, setUsuarioActivo] = useState();
    const [jwt,setjwt] = useState()
  return (
    <div>UserContext</div>
  )
}
