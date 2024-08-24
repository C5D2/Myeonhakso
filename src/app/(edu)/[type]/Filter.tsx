'use client';

import Categories from '@/components/layout/Categories';
import Link from 'next/link';
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
  // const handleClickCategory = e => {
  //   const target = e.target as HTMLInputElement;
  //   router.replace(`/${e.target.value}`);
  // };

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
        <div className="flex p-5 sm:px-2">
          <h3 className="font-bold mr-auto ">필터</h3>
          <button
            className="w-5 h-5 bg-[url('/reset.svg')] my-auto bg-no-repeat bg-cover"
            type="button"
            onClick={handleReset}
          ></button>
        </div>
        {/* 모바일일 경우 */}
        <hr className="dsm:hidden" />
        <div className="dsm:hidden w-full p-10 flex flex-col sm:p-3 sm:text-xs">
          <label className="font-semibold mb-3">카테고리</label>
          {/* <div className="flex flex-col gap-2 w-full">
            <div className="w-[80%] border border-gray-30 text-center">
              <Link href={`/tech`}>IT</Link>
            </div>
            <div className="w-[80%] border border-gray-30 text-center">
              <Link href={`/language`}>어학</Link>
            </div>
            <div className="w-[80%] border border-gray-30 text-center">
              <Link href={`/hobby`}>취미</Link>
            </div>
          </div> */}
          <Categories />
        </div>

        <hr className="" />

        <div className="w-full p-8 flex flex-col sm:p-3 sm:text-xs">
          <div className="flex ">
            <select
              onChange={handleChangeSelectbox}
              name="sortName"
              id="sort"
              className="border border-gray-30 rounded-md px-5 py-1 mb-10 sm:my-5 mx-auto w-[80%] sm:px-1 sm:w-full"
            >
              <option value={`{"createdAt":-1}`}>최신순</option>
              <option value={`{"createdAt":1}`}>오래된순</option>
              <option value={`{"bookmarks":1}`}>인기순</option>
              <option value={`{"price":-1}`}>가격높은순</option>
              <option value={`{"price":1}`}>가격낮은순</option>
            </select>
          </div>

          <hr className="sm:mb-5 mb-10" />

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
