'use client';

import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
  const pathName = usePathname();
  const type = pathName.split('/')[2];
  const path = pathName.split('/')[3];

  console.log(page, totalPages);

  const pageList = [];
  const searchParams = useSearchParams();

  for (let i = 1; i <= totalPages; i++) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(i));
    const search = newSearchParams.toString();

    pageList.push(
      <li key={i} className={page === i ? 'font-bold text-blue-700' : ''}>
        <Link href={`/mypage/${type}/${path}?${search}`}>{i}</Link>
      </li>,
    );
  }
  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">{pageList}</ul>
    </div>
  );
}
