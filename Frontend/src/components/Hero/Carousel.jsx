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

    console.log('games')
    console.log(swiperGames)


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
    // autoplay={{delay:3000}}
    navigation={true}
    modules={[Autoplay,Pagination, Navigation]}
    className="Carousel"
  >{/* Imagenes de : 1096 x 460 */}
    {swiperGames.map(game=>
      <SwiperSlide>
      <div className='sliderWrap'>
        <div className='sliderInner'>
          <div className='chachara'>
            <div className='deal'>
              {game.tags.newIn?<p>{game.tags.newIn}</p>:null}
              <p>{game.name}</p>
            </div>
            <div className='BuyandPrice'> 
              {/* <p className='discount'>-67%</p> */}
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
