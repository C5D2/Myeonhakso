import MobileMypageButton from '@/app/mypage/MobileMypageButton';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer() {
  const session: Session | null = await auth();
  let type;
  if (session?.user?.type === 'seller') {
    type = 'tutor';
  } else if (session?.user?.type === 'user') {
    type = 'tutee';
  }

  return (
    <>
      {/* 모바일 푸터  */}
      <div className="z-30 dsm:hidden fixed left-0 bottom-0 w-full h-[60px] flex-shrink-0 bg-white px-5 py-2">
        <ul className="flex gap-6 text-gray-50 font-thin justify-between">
          {session?.user ? (
            <>
              <li>
                <Link
                  href={`/mypage/${type}/dashboard`}
                  className="text-center"
                >
                  <Image
                    src="/footer-dashboard.svg"
                    alt="대시보드 아이콘"
                    width={25}
                    height={25}
                    style={{ margin: '0 auto' }}
                  />
                  <p className="text-[10px]">대시보드</p>
                </Link>
              </li>
              <li>
                <Link href="/tech" className="text-center">
                  <Image
                    src="/footer-lecture-list.svg"
                    alt="강의목록 아이콘"
                    width={25}
                    height={25}
                    style={{ margin: '0 auto' }}
                  />
                  <p className="text-[10px]">강의목록</p>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-center">
                  <Image
                    src="/footer-home.svg"
                    alt=""
                    width={25}
                    height={25}
                    style={{ margin: '0 auto' }}
                  />
                  <p className="text-[10px]">홈</p>
                </Link>
              </li>
              {session?.user?.type === 'seller' ? (
                <li>
                  <Link href={`/mypage/${type}/management`}>
                    <Image
                      src="/footer-management.svg"
                      alt="강의 관리 아이콘"
                      width={25}
                      height={25}
                      style={{ margin: '0 auto' }}
                    />
                    <p className="text-[10px]">강의관리</p>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={`/mypage/${type}/bookmark`}>
                    <Image
                      src="/footer-heart.svg"
                      alt="북마크 아이콘"
                      width={25}
                      height={25}
                      style={{ margin: '0 auto' }}
                    />
                    <p className="text-[10px]">북마크</p>
                  </Link>
                </li>
              )}
              <MobileMypageButton type={type} />
            </>
          ) : (
            <>
              <li>
                <Link href="/tech" className="text-center">
                  <Image
                    src="/footer-lecture-list.svg"
                    alt="강의 목록 아이콘"
                    width={25}
                    height={25}
                    className="mx-auto"
                  />
                  <p className="text-[10px]">강의목록</p>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-center">
                  <Image
                    src="/footer-home.svg"
                    alt="홈 아이콘"
                    width={25}
                    height={25}
                    className="mx-auto"
                  />
                  <p className="text-[10px]">홈</p>
                </Link>
              </li>
              <li>
                <Link href={`/login`}>
                  <Image
                    src="/footer-mypage.svg"
                    alt="로그인 아이콘"
                    width={25}
                    height={25}
                    className="mx-auto"
                  />
                  <p className="text-[10px]">로그인</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* 데스크탑 푸터 */}
      <div className="sm:hidden p-10 h-[120px] mt-auto flex-shrink-0 bg-main-light-green">
        <ul className="flex gap-6 text-gray-50 font-thin">
          <li className="">면학소 소개</li>
          <li>사용자 이용 약관</li>
          <li>개인정보 처리 방침</li>
        </ul>
        <p className="font-thin">(주) 면학소 | 대표자 : 뱅쿄시요</p>
      </div>
    </>
  );
}
