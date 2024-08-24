'use client'

import {  signOut } from "next-auth/react";
import Submit from "../Submit"
import Image from "next/image";
import useUserStore from "@/zustand/userStore";
import useModalStore from "@/zustand/useModalStore";


function LoginInfo({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) {

	const clearUser = useUserStore((state) => state.clearUser);
  const openModal = useModalStore((state) => state.openModal);

  const handleSignOut = (event: React.FormEvent) => {
    event.preventDefault();
		openModal({
      content: `${name}님 로그아웃 하시겠습니까?`,
      callbackButton: {
        확인: async() => {
          await signOut({ redirect: true, callbackUrl: '/' });
        },
      },
    });	
    clearUser();
  };


	return (
		<form onSubmit={handleSignOut}>
		<p className="flex items-center text-sm mx-3">
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
			<Submit className="py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white ml-1 ">
				로그아웃
			</Submit>
		</p>
	</form>
	)
}

export default LoginInfo