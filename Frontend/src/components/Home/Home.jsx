import React from 'react'
import { useEffect } from 'react'
import Footer from '../Footer/Footer';
import Swiper from '../Hero/Carousel'

export default function Home() {

  useEffect(()=>{
    document.title = 'FocusG Store';
  },[])
  
  return (
    <section>
        <Swiper />
        {/* lista de juegos menos de 10 dolares */}
        {/* Juegos Recomendados */}
    </section>
  )
}
