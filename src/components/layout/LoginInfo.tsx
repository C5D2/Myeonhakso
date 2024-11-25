'use client';

import { signOut } from 'next-auth/react';
import Submit from '../Submit';
import Image from 'next/image';
import useUserStore from '@/zustand/userStore';
import { normalizeImageUrl } from '@/utils/imageUrlUtils';
import { Bounce, toast } from 'react-toastify';

function LoginInfo() {
  const user = useUserStore(state => state.user);
  const clearUser = useUserStore(state => state.clearUser);

  const handleSignOut = async (event: React.FormEvent) => {
    try{
    event.preventDefault();
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
  };

  return (
    <form onSubmit={handleSignOut}>
      <div className="flex items-center text-sm mx-3">
        {user?.image && (
          <Image
            className="w-8 rounded-full mr-2"
            src={normalizeImageUrl(user.image)}
            width="40"
            height="40"
            alt="프로필 이미지"
          />
        )}
        {user?.name}님 :)
        <Submit className="py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white">
          로그아웃
        </Submit>
      </div>
    </form>
  );
}

export default LoginInfo;
