'use client';

import { Ilecture } from '@/types/lecture';
import Link from 'next/link';

interface ICardProp {
  index?: number;
  item: Ilecture;
}

export default function Card({ item }: ICardProp) {
  let bgColorClass;
  let iconClass;

  switch (item?.extra?.type) {
    case 'tech':
      bgColorClass = 'bg-light-green';
      iconClass = '/tech.svg';
      break;

    case 'language':
      bgColorClass = 'bg-light-yellow';
      iconClass = '/language.svg';
      break;

    case 'hobby':
      bgColorClass = 'bg-light-orange';
      iconClass = '/hobby.svg';
      break;
  }
  return (
    <Link
      href={`/${item?.extra?.type}/${item?._id}`}
      className={`w-[80%] min-w-[150px] h-full`}
    >
      <div className={`border border-gray-10 rounded-xl ${bgColorClass} p-5`}>
        <div className="flex items-center mb-5">
          <p className="border border-black rounded-full px-2 mr-auto bg-white md:text-xs min-w-20 truncate">
            웹 프로그래밍
          </p>
          <div className="min-w-10 h-10">
            <img src={`${iconClass}`} className="min-h-full" />
          </div>
        </div>
        <h3 className="font-bold text-left mb-5 h-10 truncate">{item?.name}</h3>
        <p className="text-left mb-5 font-light text-gray-500 h-10 truncate">
          상품 설명입니다.
        </p>

        <div className="flex">
          <div className="w-5 h-5">
            <img src="/calendar.svg" alt="" />
          </div>
          <p>2달</p>
        </div>

        <hr className="my-5" />

        <div className="flex">
          <div className="flex gap-1 mr-auto">
            <div className="w-5 h-5">
              <img src="/level-low.svg" alt="" />
            </div>
            <p>입문</p>
          </div>
          <div className="flex gap-1">
            <div className="w-5 h-5">
              <img src="/star.svg" alt="" />
            </div>
            <p>4.5</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
