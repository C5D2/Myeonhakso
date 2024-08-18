'use client';

import Card from '@/components/Card';
import { IBookmark } from '@/types/lecture';
import Image from 'next/image';
import { useState } from 'react';

const ITEM_COUNT = 8;

interface BookmarkPaginationProps {
  items: IBookmark[];
}

export default function BookmarkPagination({ items }: BookmarkPaginationProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(items.length / ITEM_COUNT);
  const offset = currentPage * ITEM_COUNT;
  const currentPageItems = items.slice(offset, offset + ITEM_COUNT);

  const passNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount - 1));
  };

  const passPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 relative mx-5">
      {currentPageItems.map((item, index) => (
        <div className="max-w-[300px] h-[320px] rounded-xl" key={index}>
          <Card key={index} item={item} />
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
  );
}
