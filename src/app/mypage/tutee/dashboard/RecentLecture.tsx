'use client';
import { IOrderSaleList } from '@/types/mypage';
import { useLogStore } from '@/zustand/logStore';
import Link from 'next/link';

export default function RecentLecture({ item }: { item: IOrderSaleList }) {
  const lecture = useLogStore(state => state.lecture);
  const type = item.products[0].extra.type;

  console.log(type);
  return (
    <div className="h-full flex flex-col ">
      <Link
        href={`/orders/${item._id}`}
        className="flex gap-5 p-5 my-auto items-center bg-light-green rounded-lg"
      >
        <img src={`/${type}.svg`} />

        <p>{item.products[0].name}</p>
      </Link>
    </div>
  );
}
