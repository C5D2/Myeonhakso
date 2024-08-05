'use client';

import { Ilecture } from '@/types/lecture';
import Link from 'next/link';

interface ICardProp {
  index?: number;
  item: Ilecture;
}

export default function Card({ index, item }: ICardProp) {
  let bgColorClass;

  switch (index) {
    case 0:
      bgColorClass = 'bg-card-color-1';
      break;

    case 1:
      bgColorClass = 'bg-card-color-2';
      break;

    case 2:
      bgColorClass = 'bg-card-color-3';
      break;

    case 3:
      bgColorClass = 'bg-card-color-4';
      break;

    default:
      bgColorClass = 'bg-card-color-default';
  }
  return (
    <Link
      // href={`/${item?.extra?.type}/${item?._id}`}
      href={`/it/${item?._id}`}
      className={`border border-red rounded-lg w-[80%] h-full ${bgColorClass} p-5`}
    >
      <div className="flex items-center mb-5">
        <p className="border border-black rounded-full px-2 mr-auto bg-white lg:text-sm md:text-xs sm:text-xs min-w-20 truncate">
          웹 프로그래밍
        </p>
        <div className="min-w-10 h-10 hidden lg:inline-block">
          <img src="/computer.svg" className="min-h-full" />
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

      {/* it이면 컴퓨터, 어학이면 어학, 취미이면 운동 아이콘 */}
    </Link>
  );
}
