import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RPLogin({usuarioActivo,children}) {
    const navigate = useNavigate();
    console.log("usuarioActivo")
    console.log(usuarioActivo)

    useEffect(() => {

        if(usuarioActivo){
            navigate('/')
        }
      
    }, [usuarioActivo])

    
    
  return (
    <>
    {children}
    </>
  )
}
