'use client';

import useUserStore from '@/zustand/userStore';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Bounce, toast } from 'react-toastify';

function MypageModal({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUserStore();
  const clearUser = useUserStore(state => state.clearUser);
  let sideBar;

  const handleSignOut = async (event: React.FormEvent) => {
    try {
    setModalActive(!modalActive);
    clearUser();

    toast('로그아웃 완료되었습니다.', {
      position: 'top-center',
      transition: Bounce,
    });

    clearUser();

    setTimeout(async () => {
      await signOut({ redirect: false });
      window.location.href = `${window.location.origin}`;
    }, 800);
  } catch (error) {
  console.error('로그아웃 에러:', error);
  window.location.href = `${window.location.origin}`;
  }
}


  if (user?.type === 'user') {
    sideBar = (
      <div className="flex flex-col items-center mt-10 gap-10 w-fit">
        <Link
          href="/mypage/tutee/dashboard"
          onClick={() => setModalActive(!modalActive)}
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          대시보드
        </Link>
        <Link
          href="/mypage/tutee/qna"
          onClick={() => setModalActive(!modalActive)}
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          1:1 질의 응답
        </Link>
        <Link
          href="/mypage/tutee/bookmark"
          onClick={() => setModalActive(!modalActive)}
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          북마크
        </Link>
        <Link
          href="/mypage/tutee/orderlist"
          onClick={() => setModalActive(!modalActive)}
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
        >
          구매내역
        </Link>
        <Link
          className="md:text-sm  w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          href="/mypage/tutee/account"
          onClick={() => setModalActive(!modalActive)}
        >
          계정 정보
        </Link>

        <button
          className="md:text-xs mt-10 w-fit px-3 font-light text-lg text-left mr-auto"
          onClick={handleSignOut}
        >
          로그아웃
        </button>
      </div>
    );
  } else if (user?.type === 'seller') {
    sideBar = (
      <div className="flex flex-col items-center mt-10 gap-10 w-fit">
        <Link
          href="/mypage/tutor/dashboard"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          onClick={() => setModalActive(!modalActive)}
        >
          대시보드
        </Link>
        <Link
          href="/mypage/tutor/management"
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          onClick={() => setModalActive(!modalActive)}
        >
          강의 관리
        </Link>
        <Link
          href="/mypage/tutor/qna"
          className="md:text-sm  w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          onClick={() => setModalActive(!modalActive)}
        >
          1:1 질의 응답
        </Link>

        <Link
          href="/mypage/tutor/salelist"
          className="md:text-sm  w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          onClick={() => setModalActive(!modalActive)}
        >
          판매내역
        </Link>
        <Link
          className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          href="/mypage/tutor/account"
          onClick={() => setModalActive(!modalActive)}
        >
          계정 정보
        </Link>
        <Link
          // className="md:text-sm w-fit px-3 hover:bg-main-light-green hover:rounded-md font-bold text-lg text-left mr-auto"
          className="md:text-sm w-fit text-white bg-main-green/50 rounded-md font-bold text-lg py-1 px-5 border main-green"
          href="/new"
          onClick={() => setModalActive(!modalActive)}
        >
          새 강의 만들기
        </Link>

        <button
          className="md:text-xs mt-10 w-fit px-3 font-light text-lg text-left mr-auto"
          onClick={handleSignOut}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100%-110px)] w-full fixed left-0 bottom-[60px] flx justify-center items-center bg-black bg-opacity-50 text-center">
      <div className="absolute top-0 right-0 w-[70%] h-full bg-white border pt-[50px]">
        {sideBar}
      </div>
    </div>
  );
}

export default MypageModal;
