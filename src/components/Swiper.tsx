'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function SwiperBanner() {
  return (
    <>
      <Swiper
        className="mySwiper"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <Image
            src="/banner3.png"
            height={200}
            width={2000}
            alt="첫 번째 배너 이미지"
            priority={true}
            className="sm:h-[70px] sm:object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner2.png"
            height={200}
            width={2000}
            alt="두 번째 배너 이미지"
            priority={true}
            className="sm:h-[70px] sm:object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner1.png"
            height={200}
            width={2000}
            alt="세 번째 배너 이미지"
            priority={true}
            className="sm:h-[70px] sm:object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner4.png"
            height={200}
            width={2000}
            alt="네 번째 배너 이미지"
            priority={true}
            className="sm:h-[70px] sm:object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner5.png"
            height={200}
            width={2000}
            alt="다섯 번째 배너 이미지"
            priority={true}
            className="sm:h-[70px] sm:object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner6.png"
            height={200}
            width={2000}
            alt="여섯 번째 배너 이미지"
            priority={true}
            className="sm:h-[70px] sm:object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
