'use client';

import classNames from 'classnames';
import { useState } from 'react';
import DetailCurriculum from './DetailCurriculum';
import Review from './Review';
import { ILectureDetail } from '@/types/lecture';

interface IDetailCurriculumProps {
  item: ILectureDetail | null;
}

export default function Tab({ item }: IDetailCurriculumProps) {
  const [toggleState, setToggleState] = useState(1);
  // console.log('toggle', toggleState);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const getActiveClass = (index: number, className: string) =>
    toggleState === index ? className : '';

  return (
    <div className="w-full ">
      <ul className="h-[50px] flex list-none  p-0 m-0">
        <li
          className={classNames(
            'w-20 flex justify-center items-center cursor-pointer ',
            { 'font-extrabold border-b-[3px] border-black': toggleState === 1 },
          )}
          onClick={() => toggleTab(1)}
        >
          <h3 className="text-xl">커리큘럼</h3>
        </li>
        <li
          className={classNames(
            'w-20 flex justify-center items-center cursor-pointer',
            { 'font-extrabold border-b-[3px] border-black': toggleState === 2 },
          )}
          onClick={() => toggleTab(2)}
        >
          <h3 className="text-xl">후기</h3>
        </li>
      </ul>
      <hr />
      <div className="">
        <div className={`p-4 ${getActiveClass(2, 'hidden')}`}>
          <DetailCurriculum item={item} />
        </div>
        <div className={`p-4 ${getActiveClass(1, 'hidden')}`}>
          {item && <Review id={item?._id} />}
        </div>
      </div>
    </div>
  );
}
