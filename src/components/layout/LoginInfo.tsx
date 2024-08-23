'use client';

import { signOut } from 'next-auth/react';
import Submit from '../Submit';
import Image from 'next/image';
import useUserStore from '@/zustand/userStore';
import Notifications from '@/components/Notifications';

function LoginInfo({
  name,
  image,
  notifications,
}: {
  name: string;
  image?: string | null;
  notifications: number;
}) {
  const clearUser = useUserStore(state => state.clearUser);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleSignOut = async (event: React.FormEvent) => {
    event.preventDefault();
    await signOut({ redirect: true, callbackUrl: '/' });
    clearUser();
  };

  return (
    <form onSubmit={handleSignOut}>
      <div className="flex items-center text-sm mx-3">
        {image && (
          <Image
            className="w-8 rounded-full mr-2"
            src={image}
            width="40"
            height="40"
            alt="프로필 이미지"
          />
        )}
        {name}님 :)
        <Notifications notifications={notifications} />
        <Submit className="py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white ml-1 ">
          로그아웃
        </Submit>
      </div>
    </form>
  );
}

export default LoginInfo;
