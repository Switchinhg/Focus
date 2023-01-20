import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Autoplay, Pagination, Navigation } from "swiper";

export default function Carousel() {
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
    <SwiperSlide>
        <div className='sliderWrap'>
          <div className='sliderInner'>
            <div className='chachara'>
              <div className='deal'>
                <p>Deal || New in store</p>
                <p>Game name</p>
              </div>
              <div className='BuyandPrice'> 
                <p className='discount'>-67%</p>
                <p>$ 26.14</p>
                <button className='BtnLogin mainScreen'> Add to cart</button>
              </div>
            </div>
            <img className='sliderImg' src="https://i.ytimg.com/vi/6uM7CQGZ6rE/maxresdefault.jpg" alt="" />
          </div>
        </div>

    </SwiperSlide>
  </Swiper>
  )
}
