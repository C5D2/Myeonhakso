import { auth } from '@/auth';
import Link from 'next/link';
import LoginInfo from './LoginInfo';
import SessionHandler from './SessionHandler';
import Categories from './Categories';
import Button from '../Button';
import { Session } from 'next-auth';
import Image from 'next/image';
import Back from './Back';
import Notifications from '@/components/Notifications';
import NotiBell from '@/components/NotiBell';

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
      {/* 모바일헤더 */}
      <div className="bg-white z-30 fixed top-0 left-0 mb-auto w-full h-[50px] dsm:hidden flex justify-between px-5 py-3">
        <Back />
        <Link
          href="/"
          className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        >
          <Image src="/logo.svg" alt="면학소 로고" width={35} height={35} />
        </Link>
        {session?.user ? (
          // <Link href="/" className="ml-auto">
          //   <Image src="/alarm.svg" alt="알림" width={20} height={20} />
          // </Link>
          <div className="ml-auto">
            <NotiBell userId={session.user.id!} />
          </div>
        ) : (
          <Link
            href="/login"
            className="ml-auto py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white"
          >
            로그인
          </Link>
        )}
      </div>
      {/* 데스크탑 헤더  */}
      <div className="sm:hidden box-border px-10 py-3 border-b-[3px] h-[85px] flex-shrink-0 flex items-center">
        <Link href="/" className="w-14 h-14 mr-20 sm:mr-0 relative">
          <Image
            src="/logo.svg"
            alt="면학소 로고"
            // height={100}
            // width={100}
            layout="fill"
            objectFit="contain"
          />
        </Link>
        <Categories />
        <div className="flex justify-end items-center ml-auto">
          {session?.user ? (
            <>
              <Button>
                <Link href={`/mypage/${type}/dashboard`}> 내 강의실 </Link>
              </Button>

              <LoginInfo
                userId={session.user.id!}
                name={session.user.name!}
                image={session.user.image}
                // notifications={session.user.notifications}
              />
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
