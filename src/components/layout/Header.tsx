import { auth } from '@/auth';
import Link from 'next/link';
import LoginInfo from './LoginInfo';
import SessionHandler from './SessionHandler';
import Categories from './Categories';
import Button from '../Button';
import { Session } from 'next-auth';
import Image from 'next/image';
import Back from './Back';

export default async function Header() {
  const session: Session | null = await auth();
  let type;
  if (session?.user?.type === 'seller') {
    type = 'tutor';
  } else if (session?.user?.type === 'user') {
    type = 'tutee';
  }

  return (
    <>
      <div className="mb-auto w-full h-[50px] dsm:hidden flex justify-between relative px-5 py-3">
        <Back />
        <Link
          href="/"
          className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        >
          <Image src="/logo.svg" alt="면학소 로고" width={35} height={35} />
        </Link>
        <Link href="/" className="">
          <Image src="/alarm.svg" alt="알림" width={20} height={20} />
        </Link>
      </div>
      <div className="sm:hidden box-border px-10 py-3 border-b-[3px] h-[85px] flex-shrink-0 flex items-center">
        <Link href="/" className="w-14 h-14 mr-20 sm:mr-0">
          <img src="/logo.svg" className="h-full min-w-full" />
        </Link>
        <Categories />
        <div className="flex justify-end items-center ml-auto">
          {session?.user ? (
            <>
              <Button>
                <Link href={`/mypage/${type}/dashboard`}> 내 강의실 </Link>
              </Button>

              <LoginInfo name={session.user.name!} image={session.user.image} />
              <SessionHandler session={session} />
            </>
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
    </>
  );
}
