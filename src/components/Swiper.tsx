'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { Autoplay } from 'swiper/modules';

export default function SwiperBanner() {
  return (
    <>
      <Swiper
        className="mySwiper"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <img src="/banner1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/banner2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/banner1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/banner2.png" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
