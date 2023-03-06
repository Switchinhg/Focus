import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function RPLibrary({usuarioActivo,children}) {
    const [loading,setLoading]= useState(true)
    const navigate = useNavigate();

    useEffect(() => {

        if(!usuarioActivo){
            navigate('/')
        }


        setLoading(false)

      
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