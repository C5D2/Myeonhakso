'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Categories() {
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? true : false);

  return (
    <>
      <ul className="sm:flex-col flex gap-20 sm:gap-2 ">
        {/* hover:bg-main-green rounded hover:text-white */}

        <Link href="/tech">
          <li
            className={classNames(
              'hover:bg-main-green rounded hover:text-white px-2 py-1',
              {
                'font-bold bg-main-green text-white': isActive('/tech'),
              },
            )}
          >
            IT
          </li>
        </Link>

        <Link href="/language">
          <li
            className={classNames(
              'hover:bg-main-green rounded hover:text-white px-2 py-1',
              { 'font-bold bg-main-green text-white': isActive('/language') },
            )}
          >
            어학
          </li>
        </Link>

        <Link href="/hobby">
          {' '}
          <li
            className={classNames(
              'hover:bg-main-green rounded hover:text-white px-2 py-1',
              { 'font-bold bg-main-green text-white': isActive('/hobby') },
            )}
          >
            취미
          </li>
        </Link>
      </ul>
    </>
  );
}

export default Categories;
