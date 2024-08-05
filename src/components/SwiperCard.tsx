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
import { lectureFetch } from '@/data/lectureFetch';
import useSWR from 'swr';

interface SwiperCardProps {
  sortParam: string; // prop 이름과 타입 정의
}
const getLectures = async (path: string, sort?: object) => {
  const data = await lectureFetch(path, sort);
  return data;
};

function SwiperCard({ sortParam }: SwiperCardProps) {
  const path = 'products';
  const [sort, setSort] = useState<object>({});

  useEffect(() => {
    switch (sortParam) {
      case 'popular':
        setSort({ bookmarks: -1 });

        break;
      case 'recent':
        setSort({ createdAt: -1 });
        break;
      case 'teacher':
        break;
    }
  }, []);

  const { data, error, isLoading } = useSWR<Ilecture[] | null>(
    [path, sort],
    () => getLectures(path, sort),
  );

  if (isLoading) return <p>loading...</p>;

  const list = data?.map((item, index) => (
    <SwiperSlide key={index}>
      <Card key={index} item={item} />
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        slidesPerView={4}
        // centeredSlides={true}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {list}
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide> */}
      </Swiper>
    </>
  );
}

export default SwiperCard;
