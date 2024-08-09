'use client';

import { ILectureDetail } from '@/types/lecture';
import Image from 'next/image';
import { useState } from 'react';

export default function DetailCurriculum({ item }: { item: ILectureDetail }) {
  const [showAllCurriculum, setShowAllCurriculum] = useState(false);

  const curriculumItems = item?.extra?.curriculum || [];
  const initialDisplayCount = 6;

  const toggleCurriculum = () => {
    setShowAllCurriculum(!showAllCurriculum);
  };

  return (
    <>
      <div className="mt-[50px]">
        <h3 className="font-bold">커리큘럼</h3>
      </div>
      {(showAllCurriculum
        ? curriculumItems
        : curriculumItems.slice(0, initialDisplayCount)
      ).map((curriculumItem, index) => (
        <div
          key={index}
          className="rounded-lg bg-gray-10 border-gray-30 h-[80px] flex items-center px-4"
        >
          <span>
            {index + 1}. {curriculumItem.content}
          </span>
        </div>
      ))}
      {curriculumItems.length > initialDisplayCount && (
        <div className="flex justify-center mt-2">
          <button onClick={toggleCurriculum} className="focus:outline-none">
            <Image
              src="/triangle.svg"
              width={40}
              height={40}
              alt={showAllCurriculum ? '접기' : '펼치기'}
              className={`transform ${showAllCurriculum ? 'rotate-180' : ''} transition-transform duration-500`}
            />
          </button>
        </div>
      )}
    </>
  );
}
