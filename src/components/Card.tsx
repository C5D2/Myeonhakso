'use client';

import { IBookmark, Ilecture } from '@/types/lecture';
import Image from 'next/image';
import Link from 'next/link';

interface ICardProp {
  index?: number;
  item: Ilecture | IBookmark;
}

export default function Card({ item }: ICardProp) {
  const isLectureBookmark = (item: Ilecture | IBookmark): item is IBookmark => {
    return 'product' in item;
  };
  const productItem = isLectureBookmark(item) ? item.product : item;
  const rating = productItem?.rating;
  const name = productItem?.name;

  let bgColorClass;
  let iconClass;
  let textColorClass;
  let borderColorClass;

  switch (item?.extra?.type) {
    case 'tech':
      bgColorClass = 'bg-light-green';
      textColorClass = 'text-main-green';
      borderColorClass = 'border-main-green';
      iconClass = '/tech.svg';
      break;

    case 'language':
      bgColorClass = 'bg-light-yellow';
      textColorClass = 'text-main-yellow';
      borderColorClass = 'border-main-yellow';

      iconClass = '/language.svg';
      break;

    case 'hobby':
      bgColorClass = 'bg-light-orange';
      textColorClass = 'text-main-red';
      borderColorClass = 'border-main-red';

      iconClass = '/hobby.svg';
      break;
  }

  return (
    <Link
      href={`/${item?.extra?.type}/${productItem?._id}`}
      className={`w-[80%] min-w-[150px] h-full `}
    >
      <div
        className={`border border-gray-10 rounded-xl ${bgColorClass} p-5 hover:shadow-lg`}
      >
        <div className="flex items-center mb-5">
          <p
            className={`${textColorClass} border ${borderColorClass} text-center rounded-full px-2 mr-auto bg-white md:text-xs min-w-20 truncate`}
          >
            {item?.extra?.type}
          </p>
          <div className="">
            <Image
              src={`${iconClass}`}
              alt="강의 카테고리 아이콘"
              width={34}
              height={34}
              className="sm:w-6 sm:h-6"
            />
          </div>
        </div>
        <h3 className="text-lg font-bold text-left mb-5 h-10 truncate">
          {name}
        </h3>
        <p className="text-left mb-5 font-light text-gray-500 h-10 truncate text-sm">
          {productItem?.extra?.curriculum?.[0]?.content}
        </p>

        <div className="flex">
          {/* <div className="w-5 h-5">
            <img src="/calendar.svg" alt="" />
          </div> */}
          <p className="text-green-800 font-semibold">
            ₩
            {productItem?.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}{' '}
            원
          </p>
        </div>

        <hr className="my-5" />

        <div className="flex">
          <div className="flex gap-1 mr-auto">
            <div className="w-5 h-5">
              <Image src="/level-low.svg" alt="레벨" width={20} height={20} />
            </div>
            <p>{productItem?.extra?.level}</p>
          </div>
          <div className="flex gap-1">
            <div>
              <Image src="/star.svg" alt="별점" width={20} height={20} />
            </div>
            <p>{rating ? rating.toFixed(1) : '_'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
