'use client';

import useUserStore from '@/zustand/userStore';
import Link from 'next/link';

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  let sideBar;

  if (user?.type === 'user') {
    sideBar = (
      <div className="flex flex-col items-center mt-10 gap-10 w-fit">
        <Link
          href="/mypage/tutee/dashboard"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          대시보드
        </Link>
        <Link
          href="/mypage/tutee/qna"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          1:1 질의 응답
        </Link>
        <Link
          href="/mypage/tutee/bookmark"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          북마크
        </Link>
        <Link
          href="/mypage/tutee/orderlist"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          구매내역
        </Link>
        <Link
          className="md:text-sm  w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          href="/mypage/tutee/account"
        >
          계정 정보
        </Link>
      </div>
    );
  } else if (user?.type === 'seller') {
    sideBar = (
      <div className="flex flex-col items-center mt-10 gap-10 w-fit">
        <Link
          href="/mypage/tutor/dashboard"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          대시보드
        </Link>
        <Link
          href="/mypage/tutor/management"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          강의 관리
        </Link>
        <Link
          href="/mypage/tutor/qna"
          className="md:text-sm  w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          1:1 질의 응답
        </Link>

        <Link
          href="/mypage/tutor/salelist"
          className="md:text-sm  w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          판매내역
        </Link>
        <Link
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          href="/mypage/tutor/account"
        >
          계정 정보
        </Link>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="basis-1/5 min-w-[130px] flex justify-center sm:hidden">
        {sideBar}
      </div>
      <div className="basis-full max-w-[1300px]">
        <div className="mt-10 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
