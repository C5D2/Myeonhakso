'use client';



import {  signOut } from "next-auth/react";
import Submit from "../Submit"
import Image from "next/image";
import useUserStore from "@/zustand/userStore";
import useModalStore from "@/zustand/useModalStore";
import NotiBell from "../NotiBell";
import { normalizeImageUrl } from "@/utils/imageUrlUtils";
import { Bounce, toast } from 'react-toastify';


function LoginInfo() {
  const user = useUserStore(state => state.user);
  const clearUser = useUserStore(state => state.clearUser);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const openModal = useModalStore(state => state.openModal);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleSignOut = async (event: React.FormEvent) => {
    event.preventDefault();
    toast('로그아웃 완료되었습니다.', {
      position: 'top-center',
      transition: Bounce,
    });

    clearUser();

    setTimeout(async () => {
      await signOut({ redirect: true, callbackUrl: '/' });
    }, 500);
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
        {/* <Notifications notifications={notifications} /> */}
        <NotiBell userId={user?.id!} />
        <Submit className="py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white">
          로그아웃
        </Submit>
      </div>
    </form>
  );
}

export default LoginInfo;
