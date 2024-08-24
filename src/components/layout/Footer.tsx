import MobileMypageButton from '@/app/mypage/MobileMypageButton';
import { auth } from '@/auth';
import { Session } from 'next-auth';
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
              <Link href={`/mypage/${type}/dashboard`} className="text-center">
                <img src="/footer-dashboard.svg" alt="" className="mx-auto" />
                <p className="text-[10px]">대시보드</p>
              </Link>
              <Link href="/tech" className="text-center">
                <img
                  src="/footer-lecture-list.svg"
                  alt=""
                  className="mx-auto"
                />
                <p className="text-[10px]">강의목록</p>
              </Link>
              <Link href="/" className="text-center">
                <img src="/footer-home.svg" alt="" className="mx-auto" />
                <p className="text-[10px]">홈</p>
              </Link>
              {session?.user?.type === 'seller' ? (
                <Link href={`/mypage/${type}/management`}>
                  <img
                    src="/footer-management.svg"
                    alt=""
                    className="mx-auto"
                  />
                  <p className="text-[10px]">강의관리</p>
                </Link>
              ) : (
                <Link href={`/mypage/${type}/bookmark`}>
                  <img src="/footer-heart.svg" alt="" className="mx-auto" />
                  <p className="text-[10px]">북마크</p>
                </Link>
              )}
              <MobileMypageButton type={type} />

              {/* <Link href={`/mypage/${type}/dashboard`}>
                <img src="/footer-mypage.svg" alt="" className="mx-auto" />
                <p className="text-[10px]">내강의실</p>
              </Link> */}
            </>
          ) : (
            <>
              <Link href="/tech" className="text-center">
                <img
                  src="/footer-lecture-list.svg"
                  alt=""
                  className="mx-auto"
                />
                <p className="text-[10px]">강의목록</p>
              </Link>
              <Link href="/" className="text-center">
                <img src="/footer-home.svg" alt="" className="mx-auto" />
                <p className="text-[10px]">홈</p>
              </Link>
              <Link href={`/login`}>
                <img src="/footer-mypage.svg" alt="" className="mx-auto" />
                <p className="text-[10px]">로그인</p>
              </Link>
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
