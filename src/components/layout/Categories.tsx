'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Categories() {
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? 'font-bold' : '');

  return (
    <>
      <ul className="flex gap-20">
        <li className={isActive('/tech')}>
          <Link href="/tech">IT</Link>
        </li>
        <li className={isActive('/language')}>
          <Link href="/language">어학</Link>
        </li>
        <li className={isActive('/hobby')}>
          <Link href="/hobby">취미</Link>
        </li>
      </ul>
    </>
  );
}

export default Categories;
