import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";
import { useEffect ,useState} from 'react';
import { usarCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { UsarAuth } from '../Context/UserContext';
import {useNavigate} from 'react-router-dom'


export default function Carousel() {
  const [swiperGames,setSwiperGames] = useState()
  const {addToCart} = usarCart()
  const {usuarioActivo} = UsarAuth()
  const redirect = useNavigate()

    useEffect(()=>{
      fetch(`${import.meta.env.VITE_APP_FETCH}/api/swiper-games`)
        .then(e=>e.json())
        .then(games=>setSwiperGames(games.games))
    },[])


    if(!swiperGames)return <Loading  height='460px'/>

  return (
    <Swiper
    slidesPerView={1}
    spaceBetween={30}
    loop={true}
    pagination={{
      clickable: true
    }}
    centeredSlides={true}
    autoplay={{delay:3000,disableOnInteraction: false,}}
    navigation={true}
    modules={[Autoplay,Pagination, Navigation]}
    className="Carousel"
  >
    {swiperGames.map(game=>
      <SwiperSlide key={game._id}>
      <div className='sliderWrap'>
        <div className='sliderInner'>
          <div className='chachara'>
            <div className='deal'>
              {game.tags.newIn?<p>NEW IN</p>:<p>DEAL</p>}
              <p>{game.name}</p>
            </div>
            <div className='BuyandPrice'> 
            {game.tags.sale.sale?<p className='discount'>- {game.tags.sale.percent} %</p>:null}
              <p>{game.price === 0? 'FREE' :"$ "+game.price+" USD"}</p>
              {usuarioActivo?
                <button className='BtnLogin mainScreen' onClick={()=>addToCart(game._id)}> Add to cart</button>
                :
                <button className='BtnLogin mainScreen' onClick={()=>redirect('/login')}> Log in</button>
              }
            </div>
          </div>
          <Link  to={`/game/${game._id}`}>
          <img className='sliderImg' src={game.img.banner} alt={`${game.name} banner image`} />
          </Link>
        </div>
      </div>
  </SwiperSlide>
    )}
  </Swiper>
  )
}
