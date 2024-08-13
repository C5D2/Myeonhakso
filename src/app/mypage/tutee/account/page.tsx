import { Metadata } from 'next';
import EditForm from './EditForm';

export const metadata: Metadata = {
  openGraph: {
    title: '회원 정보 수정',
    description: '회원 정보 수정 페이지.',
    // images: {
    // 	url: "/images/fesp.webp"
    // },
    // url: "https://community.fesp.shop/mypage/tutee/account",
    type: 'article',
    siteName: '면학소',
  },
};

async function Page() {
  return (
    <>
      <div className="text-2xl text-gray-90 font-semibold mb-8">계정 정보</div>
      <EditForm />
    </>
  );
}

export default Page;
