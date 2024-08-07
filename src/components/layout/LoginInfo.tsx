'use client'

import {  signOut } from "next-auth/react";
import Submit from "../Submit"
import Image from "next/image";
import useUserStore from "@/zustand/userStore";
import { useRouter } from "next/navigation";

function LoginInfo({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) {
	const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleSignOut = async (event: React.FormEvent) => {
    event.preventDefault();
    await signOut({ redirect: false });
    clearUser();
		window.location.reload();
    router.push('/');
  };


	return (
		<form onSubmit={handleSignOut}>
		<p className="flex items-center">
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
			<Submit className="py-1 px-2 text-sm text-gray-500 hover:bg-main-green rounded hover:text-white">
				로그아웃
			</Submit>
		</p>
	</form>
	)
}

export default LoginInfo