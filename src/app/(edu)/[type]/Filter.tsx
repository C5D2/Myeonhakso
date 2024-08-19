'use client';

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Filter() {
  const pathName = usePathname();
  const query = decodeURIComponent(useSearchParams().toString());
  const pageName = pathName.split('/')[1];
  let searchContent: string;

  if (query.includes('keyword')) {
    const regex = /keyword=([^&]+)/;
    const match = query.match(regex);

    if (match) {
      searchContent = match[1];
    }
  }

  const router = useRouter();
  const handleClickOption: React.ChangeEventHandler<HTMLInputElement> = e => {
    const target = e.target as HTMLInputElement;
    // 라디오를 눌렀을 때
    if (query.includes('keyword') && query.includes('sort')) {
      router.replace(
        `${pathName}?custom={"extra.level":"${target.value}","extra.type":"${pageName}"}&keyword=${searchContent}`,
        // `/${pageName}?custom={"extra.level":"${e.target.value}","extra.type":"${pageName}"}`,
      );
    } else if (query.includes('keyword') && !query.includes('sort')) {
      router.replace(
        `${pathName}?custom={"extra.level":"${target.value}","extra.type":"${pageName}"}&keyword=${searchContent}`,
        // `/${pageName}?custom={"extra.level":"${e.target.value}","extra.type":"${pageName}"}`,
      );
    } else if (query.includes('sort')) {
      const selecboxSelected = document.getElementById(
        'sort',
      ) as HTMLSelectElement | null;
      router.replace(
        `${pathName}?custom={"extra.level":"${target.value}","extra.type":"${pageName}"}&sort=${selecboxSelected!.value}`,
        // `/${pageName}?custom={"extra.level":"${e.target.value}","extra.type":"${pageName}"}`,
      );
    } else {
      router.replace(
        `${pathName}?custom={"extra.level":"${target.value}","extra.type":"${pageName}"}`,
        // `/${pageName}?custom={"extra.level":"${e.target.value}","extra.type":"${pageName}"}`,
      );
    }
  };

  const handleChangeSelectbox: React.ChangeEventHandler<
    HTMLSelectElement
  > = e => {
    const target = e.target as HTMLSelectElement;
    //셀렉트박스일 때
    if (query.includes('keyword') && query.includes('level')) {
      const radioSelected: HTMLInputElement | null = document.querySelector(
        'input[type="radio"]:checked',
      );
      router.replace(
        `${pathName}?custom={"extra.level":"${radioSelected!.value}","extra.type":"${pageName}"}&sort=${target.value}&keyword=${searchContent}`,
        // `/${pageName}?custom={"extra.level":"${e.target.value}","extra.type":"${pageName}"}`,
      );
    } else if (query.includes('keyword') && !query.includes('level')) {
      router.replace(
        `${pathName}?sort=${target.value}&keyword=${searchContent}`,
        // `/${pageName}?custom={"extra.level":"${e.target.value}","extra.type":"${pageName}"}`,
      );
    } else if (query.includes('level')) {
      const radioSelected: HTMLInputElement | null = document.querySelector(
        'input[type="radio"]:checked',
      );
      router.replace(
        `${pathName}?custom={"extra.level":"${radioSelected!.value}","extra.type":"${pageName}"}&sort=${target.value}`,
      );
    } else {
      router.replace(`${pathName}?sort=${target.value}`);
    }
  };

  const handleReset = () => {
    router.replace(`${pathName}`);
  };

  return (
    <div className="w-[350px] min-w-[100px] sm:w-[25%]">
      <div className="border border-gray-30 rounded-xl mx-[50px] sm:mx-0 sm:text-sm ">
        <div className="flex ">
          <h3 className="p-5 font-bold mr-auto">필터</h3>
          <button className="p-5" type="button" onClick={handleReset}>
            리셋
          </button>
        </div>

        <hr />

        <div className="w-full p-10 flex flex-col text-xs sm:p-3">
          <select
            onChange={handleChangeSelectbox}
            name="sortName"
            id="sort"
            className="border border-gray-30 rounded-md px-5 py-1 mb-10 mx-auto w-[80%] sm:px-1 sm:w-full"
          >
            <option value={`{"createdAt":-1}`}>최신순</option>
            <option value={`{"createdAt":1}`}>오래된순</option>
            <option value={`{"bookmarks":1}`}>인기순</option>
            <option value={`{"price":-1}`}>가격높은순</option>
            <option value={`{"price":1}`}>가격낮은순</option>
          </select>

          <hr className="mb-10" />

          <label className="font-semibold mb-3">난이도</label>
          <div className="flex flex-col gap-2">
            <div>
              <input
                type="radio"
                name="level"
                onChange={handleClickOption}
                value="입문"
              />{' '}
              <span>입문</span>
            </div>
            <div>
              <input
                type="radio"
                name="level"
                onChange={handleClickOption}
                value="초급"
              />{' '}
              <span>초급</span>
            </div>
            <div>
              <input
                type="radio"
                name="level"
                onChange={handleClickOption}
                value="중급"
              />{' '}
              <span>중급</span>
            </div>
            <div>
              <input
                type="radio"
                name="level"
                onChange={handleClickOption}
                value="고급"
              />{' '}
              <span>고급</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
