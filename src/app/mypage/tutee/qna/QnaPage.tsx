import Pagination from '@/components/Pagination';
import QnaList from '@/components/QnaList';
import { fetchQnaList } from '@/data/fetchMypage';
import Link from 'next/link';
import React from 'react';

export default async function QnaPage() {
  const resData = await fetchQnaList();

  const list = resData?.item?.map((item, index) => (
    <QnaList key={index} item={item} />
  ));

  return (
    <div className="mt-3">
      {list}
      <Pagination
        page={resData?.pagination?.page}
        totalPages={resData?.pagination?.totalPages}
      />
    </div>
  );
}
