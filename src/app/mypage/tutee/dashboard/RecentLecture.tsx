'use client';
import { IOrderSaleList } from '@/types/mypage';
import { useLogStore } from '@/zustand/logStore';
import Link from 'next/link';

export default function RecentLecture({ item }: { item: IOrderSaleList }) {
  const lecture = useLogStore(state => state.lecture);
  const type = item.products[0].extra.type;

  console.log(type);
  return (
    <div className="flex flex-col">
      <Link
        href={`/orders/${item._id}`}
        className="sm:h-10 sm:my-1 mx-10 mt-[10%] flex gap-5 p-5 items-center bg-main-light-green rounded-lg h-[50px]"
      >
        <img src={`/${type}.svg`} className="sm:hidden" />

        <p className="sm:text-xs">{item.products[0].name}</p>
      </Link>
    </div>
  );
}
