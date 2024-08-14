import { Metadata } from 'next';
import Signupform from './Signupform';

export const metadata: Metadata = {
  openGraph: {
    title: '회원 가입',
    description: '무료 회원 가입후 면학소의 모든 서비스를 이용하세요.',
    // images: {
    // 	url: "/images/fesp.webp"
    // },
    // url: "https://community.fesp.shop/user/signup",
    type: 'article',
    siteName: '면학소',
  },
};

function Page() {
  return (
    <main className="md:container mx-auto mt-14 max-w-[650px] w-full">
      <div className="mx-auto">
        <h2 className="mb-4 text-2xl text-gray-500 text-center font-semibold">
          회원가입
        </h2>
      </div>
      <Signupform />
    </main>
  );
}

export default Page;
