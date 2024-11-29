'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

export default function SwiperBanner() {
  return (
    <>
      <Swiper
        className="mySwiper"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <Link href="/tech/66">
            <Image
              src="/banner3.png"
              height={200}
              width={2000}
              alt="첫 번째 배너 이미지"
              priority={true}
              className="sm:h-[70px] sm:object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/tech/61">
            <Image
              src="/banner2.png"
              height={200}
              width={2000}
              alt="두 번째 배너 이미지"
              priority={true}
              className="sm:h-[70px] sm:object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/tech/64">
            <Image
              src="/banner1.png"
              height={200}
              width={2000}
              alt="세 번째 배너 이미지"
              priority={true}
              className="sm:h-[70px] sm:object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/tech/62">
            <Image
              src="/banner4.png"
              height={200}
              width={2000}
              alt="네 번째 배너 이미지"
              priority={true}
              className="sm:h-[70px] sm:object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/hobby/60">
            <Image
              src="/banner5.png"
              height={200}
              width={2000}
              alt="다섯 번째 배너 이미지"
              priority={true}
              className="sm:h-[70px] sm:object-cover"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/hobby/65">
            <Image
              src="/banner6.png"
              height={200}
              width={2000}
              alt="여섯 번째 배너 이미지"
              priority={true}
              className="sm:h-[70px] sm:object-cover"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
