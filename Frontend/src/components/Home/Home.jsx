import React from 'react'
import { useEffect } from 'react'
import Swiper from '../Hero/Carousel'

export default function Home() {

  useEffect(()=>{
    document.title = 'FocusG Store';
  },[])
  
  return (
    <section>
        <Swiper />
        {/* Juegos Recomendados */}
    </section>
  )
}
