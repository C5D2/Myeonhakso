import Pagination from '@/components/Pagination';
import QnaList from '@/components/QnaList';
import { fetchQnaList } from '@/data/fetchMypage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function QnaPage() {
  const resData = await fetchQnaList();

  const list = resData?.item?.map((item, index) => (
    <QnaList key={index} item={item} />
  ));

  return (
    <div className="mt-3">
      {list.length > 0 ? (
        <>
          {list}
          <Pagination
            page={resData?.pagination?.page}
            totalPages={resData?.pagination?.totalPages}
          />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <p className="p-5">아직 질문이 없어요...</p>
          <Image
            src="/leaf.svg"
            height={25}
            width={25}
            alt="비어있는 데이터를 의미하는 아이콘"
          />
        </div>
      )}
    </div>
  );
}
