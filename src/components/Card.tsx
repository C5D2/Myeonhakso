'use client';

import { Ilecture } from '@/types/lecture';

interface ICardProp {
  item: Ilecture;
}
export default function Card({ item }: ICardProp) {
  return (
    <div className="border border-red w-full h-full">
      <p>{item?.name}</p>
      <p>{item?.price}</p>
      {/* it이면 컴퓨터, 어학이면 어학, 취미이면 운동 아이콘 */}
    </div>
  );
}
