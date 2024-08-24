'use client';

import classNames from 'classnames';
import { useState } from 'react';
import BookmarkPagination from '@/app/mypage/tutee/bookmark/BookmarkPagination';
import { IBookmark } from '@/types/lecture';

interface ITabProps {
  lectureItems: IBookmark[];
  teacherItems: IBookmark[];
}

export default function Tab({ lectureItems, teacherItems }: ITabProps) {
  const [toggleState, setToggleState] = useState(1);

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
          <h3>강의</h3>
        </li>
        <li
          className={classNames(
            'w-20 flex justify-center items-center cursor-pointer',
            { 'font-extrabold border-b-[3px] border-black': toggleState === 2 },
          )}
          onClick={() => toggleTab(2)}
        >
          <h3>선생님</h3>
        </li>
      </ul>
      <hr />
      <div className="">
        <div className={`p-4 ${getActiveClass(2, 'hidden')}`}>
          <BookmarkPagination items={lectureItems} />
        </div>
        <div className={`p-4 ${getActiveClass(1, 'hidden')}`}>
          <BookmarkPagination items={teacherItems} />
        </div>
      </div>
    </div>
  );
}
