'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
  const pathName = usePathname();
  const pageName = pathName.split('/')[1];
  const type = pathName.split('/')[2];
  const path = pathName.split('/')[3];

  console.log('마이페이지?',pageName, page, totalPages);
  console.log(type, path);

  const pageList = [];
  const searchParams = useSearchParams();

  for (let i = 1; i <= totalPages; i++) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(i));
    const search = newSearchParams.toString();

    if(pageName === 'mypage'){ // 마이페이지인 경우
      console.log('마이페이지에 해당합니다.');
      pageList.push(
        
        // <li key={i} className={classNames('', {'font-bold text-main-dark-green':(page === i)})}>
        //   <Link href={`/mypage/${type}/${path}?${search}`}>{i}</Link>
        // </li>,
         <li key={i} className={page === i ? 'font-bold text-main-dark-green' : 'text-gray-90'}>
         <Link href={`/mypage/${type}/${path}?${search}`}>{i}</Link>
       </li>,
      );
    }else{ // 강의 목록인 경우
      pageList.push(
        <li key={i} className={page === i ? 'font-bold text-main-dark-green' : 'text-gray-90'}>
          <Link href={`/${pageName}?${search}`}>{i}</Link>
        </li>,
      );
    }
  
  }
  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">{pageList}</ul>
    </div>
  );
}
