import { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  openGraph: {
    title: '로그인',
    description: '로그인 페이지.',
    // images: {
    // 	url: "/images/fesp.webp"
    // },
    // url: "https://community.fesp.shop/login",
    type: 'article',
    siteName: '면학소',
  },
};

function Page() {
  return (
    <main className="mx-auto mt-14 max-w-[650px] w-full">
      <div className="mx-auto">
        <h2 className="mb-4 text-2xl text-gray-500 text-center font-semibold">
          로그인
        </h2>
      </div>
      <LoginForm />
    </main>
  );
}

export default Page;
