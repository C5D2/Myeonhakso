import { auth } from '@/auth';
import Link from 'next/link';
import LoginInfo from './LoginInfo';
        import Categories from './Categories';

export default async function Header() {
  const session = await auth();
  console.log('session', session);

  return (
    <div className="box-border px-10 py-3 border-b-[3px] h-[85px] flex-shrink-0 flex justify-between">
      <img src="/logo.svg" className="w-14 h-14" />
        <Categories />

    <div className='flex justify-end items-center'>
      {session?.user ? (
        <LoginInfo name={session.user.name!} image={session.user.image}/>
      ) : (
        <div className="flex justify-end">
          <Link
            href="/login"
            className="py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white"
          >
            회원가입
          </Link>
        </div>
      )}
      </div>
    </div>
  );
}
