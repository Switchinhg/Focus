import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";
import { useEffect ,useState} from 'react';
import { usarCart } from '../Context/CartContext';

export default function Carousel() {
  const [swiperGames,setSwiperGames] = useState()
  const {addToCart} = usarCart()

    useEffect(()=>{
      fetch(`${import.meta.env.VITE_APP_FETCH}/api/swiper-games`)
        .then(e=>e.json())
        .then(games=>setSwiperGames(games.games))
    },[])


    if(!swiperGames)return <h1>LOADING...</h1>

  /* Get 10 random games  */
  return (
    <Swiper
    slidesPerView={1}
    spaceBetween={30}
    loop={true}
    pagination={{
      clickable: true
    }}
    centeredSlides={true}
    autoplay={{delay:3000}}
    navigation={true}
    modules={[Autoplay,Pagination, Navigation]}
    className="Carousel"
  >
    {swiperGames.map(game=>
      <SwiperSlide>
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
              <button className='BtnLogin mainScreen' onClick={()=>addToCart(game._id)}> Add to cart</button>
            </div>
          </div>
          <img className='sliderImg' src={game.img.banner} alt="" />
        </div>
      </div>
  </SwiperSlide>
    )}
  </Swiper>
  )
}
