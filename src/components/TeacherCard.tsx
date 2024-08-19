'use client';

import { IBookmark, Ilecture } from '@/types/lecture';
import Link from 'next/link';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface ICardItem {
  _id: number;
  extra?: {
    type: string;
  };
}

interface ICardProp {
  item: (Ilecture | IBookmark) & ICardItem;
}

export default function TeacherCard({ item }: ICardProp) {
  let bgColorClass;
  let iconClass;

  console.log(item);

  return (
    <Link
      href={`/${item?.extra?.type}/${item?._id}`}
      className={`bg-gray-10 flex rounded-xl items-center w-[80%] min-w-[150px] h-[90%] border border-gray-10`}
    >
      <div className={`p-5`}>
        <div className="w-34 h-36 rounded-xl">
          <img
            src={
              (item as IBookmark)?.user?.image ||
              (item as Ilecture)?.seller?.image ||
              ''
            }
            className="w-full h-full object-cover"
            onError={e => e.target.setAttribute('src', '/lecture-default.jpg')}
          />
        </div>
      </div>
      <h4 className="m-auto font-semibold text-sm w-[40%]">
        {(item as IBookmark)?.user?.name || (item as Ilecture)?.seller?.name}
        <p className="font-light">선생님</p>
      </h4>
    </Link>
  );
}
