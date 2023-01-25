import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RPLogin({usuarioActivo,children}) {
    const [loading,setLoading]= useState(true)
    const navigate = useNavigate();
    console.log("usuarioActivo")
    console.log(usuarioActivo)

    useEffect(() => {

        if(usuarioActivo){
            navigate('/')
        }

    setTimeout(() => {
      setLoading(false)
    }, 1000);
      
    }, [usuarioActivo])

    
  return (
    <>
    {!loading && children}
    </>
  )
}

export  function Admin({usuarioActivo,children}){
  if(usuarioActivo?.role!=="admin"){
    return <></>
  }

  return(
    <>
    {children}
    </>
  )
}
