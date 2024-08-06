'use client';

import { Ilecture } from '@/types/lecture';
import Link from 'next/link';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface ICardProp {
  item: Ilecture;
}

export default function TeacherCard({ item }: ICardProp) {
  let bgColorClass;
  let iconClass;

  return (
    <Link
      href={`/${item?.extra?.type}/${item?._id}`}
      className={`bg-gray-10 flex rounded-xl items-center w-[80%] min-w-[150px] h-full border border-gray-10`}
    >
      <div className={`p-5`}>
        <div className="w-28 h-36 rounded-xl">
          <img
            src={`${SERVER}/${item?.seller?.image}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h4 className="m-auto font-bold">{item?.seller?.name} 선생님</h4>
    </Link>
  );
}