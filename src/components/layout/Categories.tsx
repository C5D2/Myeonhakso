'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Categories() {
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? true : false);

  return (
    <>
      <ul className="flex gap-20 ">
      {/* hover:bg-main-green rounded hover:text-white */}
        <li className={classNames('hover:bg-main-green rounded hover:text-white px-2 py-1', {'font-bold' : isActive('/tech')})}>
          <Link href="/tech">IT</Link>
        </li>
        <li className={classNames('hover:bg-main-green rounded hover:text-white px-2 py-1', {'font-bold' : isActive('/language')})}>
          <Link href="/language">어학</Link>
        </li>
        <li className={classNames('hover:bg-main-green rounded hover:text-white px-2 py-1', {'font-bold' : isActive('/hobby')})}>
          <Link href="/hobby">취미</Link>
        </li>
      </ul>
    </>
  );
}

export default Categories;
