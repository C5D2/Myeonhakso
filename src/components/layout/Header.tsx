import Link from 'next/link';
import Categories from './Categories';

export default function Header() {
  return (
    <div className="box-border px-10 py-3 border-b-[3px] h-[85px] flex-shrink-0">
      <div className="flex items-center gap-20">
        <Link href="/">
          <img src="/logo.svg" className="w-14 h-14" />
        </Link>
        <Categories />
      </div>
    </div>
  );
}
