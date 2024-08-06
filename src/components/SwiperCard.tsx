'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './swipercard.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Card from './Card';
import { useEffect, useState } from 'react';
import { Ilecture } from '@/types/lecture';
import { fetchLecture } from '@/data/fetchLecture';
import useSWR from 'swr';
import TeacherCard from './TeacherCard';

interface SwiperCardProps {
  sortParam: string; // prop 이름과 타입 정의
}

function SwiperCard({ sortParam }: SwiperCardProps) {
  const path = 'products';
  const sort = { [sortParam]: -1 };
  let list;

  const getLectures = async (path: string, sort?: object) => {
    const data = await fetchLecture(path, sort);
    return data;
  };

  const { data, error, isLoading } = useSWR<Ilecture[] | null>(
    [path, sort],
    () => getLectures(path, sort),
  );

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  if (sortParam === 'buyQuantity') {
    list = data?.map((item, index) => (
      <SwiperSlide key={index}>
        <TeacherCard key={index} item={item} />
      </SwiperSlide>
    ));
  } else {
    list = data?.map((item, index) => (
      <SwiperSlide key={index}>
        <Card key={index} item={item} />
      </SwiperSlide>
    ));
  }

  return (
    <>
      <Swiper
        slidesPerView={2}
        // centeredSlides={true}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="cardSwiper"
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {list}
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide> */}

        {/* <div className="navigation-wrapper">
          <div className="swiper-button-prev">prev</div>
          <div className="swiper-button-next">next</div>
        </div> */}
      </Swiper>
    </>
  );
}

export default SwiperCard;
