'use client';

import NoTailArrow from '@/components/icons/NoTailArrow';
import { ILectureDetail } from '@/types/lecture';
import Image from 'next/image';
import { useState } from 'react';

interface IDetailCurriculumProps {
  item: ILectureDetail | null;
}

export default function DetailCurriculum({ item }: IDetailCurriculumProps) {
  const [showAllCurriculum, setShowAllCurriculum] = useState(false);

  const curriculumItems = item?.extra?.curriculum || [];
  const initialDisplayCount = 6;

  const toggleCurriculum = () => {
    setShowAllCurriculum(!showAllCurriculum);
  };

  return (
    <>
      <div className="flex text-xl justify-center text-gray-500 mt-3 mb-6">
        총 {curriculumItems.length}강
      </div>
      <div className="flex flex-col gap-3">
        {(showAllCurriculum
          ? curriculumItems
          : curriculumItems.slice(0, initialDisplayCount)
        ).map((curriculumItem, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-30 text-xl h-[80px] flex items-center p-10 gap-16"
          >
            <span>{index + 1}강</span>
            <span>{curriculumItem.content}</span>
          </div>
        ))}
      </div>
      {curriculumItems.length > initialDisplayCount && (
        <div className="flex justify-center mt-2">
          <button onClick={toggleCurriculum} className="focus:outline-none">
            <NoTailArrow
              width={40}
              height={40}
              fill={'#88B14B'}
              alt={showAllCurriculum ? '접기' : '펼치기'}
              className={`transform ${showAllCurriculum ? '-rotate-90' : 'rotate-90'} transition-transform duration-500`}
            />
          </button>
        </div>
      )}
    </>
  );
}
