'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import TeacherCard from '@/components/TeacherCard';
import { IBookmark } from '@/types/lecture';
import Image from 'next/image';

interface BookmarkPaginationProps {
  items: IBookmark[];
}

export default function BookmarkPagination({ items }: BookmarkPaginationProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemCount, setItemCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 758) {
        setItemCount(4);
      } else if (window.innerWidth < 1280) {
        setItemCount(6);
      } else {
        setItemCount(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageCount = Math.ceil(items.length / itemCount);
  const offset = currentPage * itemCount;
  const currentPageItems = items.slice(offset, offset + itemCount);

  const passNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount - 1));
  };

  const passPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const isLectureItem = (item: IBookmark): boolean => {
    return 'product' in item;
  };

  return (
    <>
      {items.length > 0 ? (
        <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 relative mx-5">
          {currentPageItems.map((item, index) => (
            <div className="max-w-[300px] h-[320px] rounded-xl" key={index}>
              {isLectureItem(item) ? (
                <Card key={index} item={item} />
              ) : (
                <TeacherCard key={index} item={item} />
              )}
            </div>
          ))}
          {currentPage > 0 && (
            <button
              onClick={passPreviousPage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <Image
                className="rotate-180"
                src="/right-arrow.svg"
                width={20}
                height={20}
                alt="왼쪽 화살표"
              />
            </button>
          )}
          {currentPage < pageCount - 1 && (
            <button
              onClick={passNextPage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <Image
                src="/right-arrow.svg"
                width={20}
                height={20}
                alt="오른쪽 화살표"
              />
            </button>
          )}
        </div>
      ) : (
        <div className="flex place-content-center py-8">
          <p className="p-5">아직 북마크가 없어요...</p>
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
