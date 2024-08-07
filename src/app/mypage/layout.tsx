import useUserStore from '@/zustand/userStore';
import Link from 'next/link';

function Layout({ children }: { children: React.ReactNode }) {
  // const user = useUserStore();// 구현 후
  type UserType = 'user' | 'seller';
  const user: UserType = 'user';
  let sideBar;

  if (user === 'user') {
    sideBar = (
      <div className="flex flex-col items-center mt-10 gap-10 w-fit">
        <Link
          href="/mypage/tutee/dashboard"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          대시보드
        </Link>
        <Link
          href="/mypage/tutee/qna"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          1:1 질의 응답
        </Link>
        <Link
          href="/mypage/tutee/bookmark"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          북마크
        </Link>
        <Link
          href="/mypage/tutee/orderlist"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          구매내역
        </Link>
        <Link
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          href="/mypage/tutee/account"
        >
          계정 정보
        </Link>
      </div>
    );
  } else if (user === 'seller') {
    sideBar = (
      <div className="flex flex-col items-center mt-10 gap-10 w-fit">
        <Link
          href="/mypage/tutee/dashboard"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          대시보드
        </Link>
        <Link
          href="/mypage/tutee/management"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          강의 관리
        </Link>
        <Link
          href="/mypage/tutee/qna"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          1:1 질의 응답
        </Link>

        <Link
          href="/mypage/tutee/salelist"
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          판매내역
        </Link>
        <Link
          className="w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          href="/mypage/tutee/account"
        >
          계정 정보
        </Link>
      </div>
    );
  }
  // const user = 'seller';
  return (
    <div className="flex h-full">
      <div className="basis-1/5 flex justify-center">{sideBar}</div>
      <div className="border border-black basis-3/5">
        <div className="mt-10 border border-black flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
