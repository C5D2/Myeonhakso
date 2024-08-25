'use client';
import { IOrderSaleList } from '@/types/mypage';
import Image from 'next/image';
import Link from 'next/link';

export default function RecentLecture({ item }: { item: IOrderSaleList }) {
  const type = item?.products[0]?.extra.type;

  return (
    <>
      {item ? (
        <Link
          href={`/orders/${item._id}`}
          className="sm:h-10 sm:my-1 sm:px-2 flex gap-5 items-center bg-main-light-green rounded-lg w-[70%] h-[50px] text-gray-90"
        >
          <img src={`/${type}.svg`} className="sm:hidden" />
          <p className="sm:text-xs">{item.products[0].name}</p>
        </Link>
      ) : (
        <div className="flex justify-center items-center">
          <p className="p-5">아직 수강한 강의가 없어요...</p>
          <Image
            src="/leaf.svg"
            height={25}
            width={25}
            alt="비어있는 데이터를 의미하는 아이콘"
          />
        </div>
      )}
    </>
  );
}
