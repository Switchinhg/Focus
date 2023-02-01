import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function RPLogin({usuarioActivo,children}) {
    const [loading,setLoading]= useState(true)
    const navigate = useNavigate();

    useEffect(() => {

        if(usuarioActivo){
            navigate('/')
        }

    setTimeout(() => {
      setLoading(false)
    }, 500);
      
    }, [usuarioActivo])

    if(loading){
      return <Loading />
    }
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
