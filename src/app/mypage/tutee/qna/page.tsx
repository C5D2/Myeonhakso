import { fetchQnaList } from '@/data/fetchMypage';
import { Metadata } from 'next';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import QnaList from '@/components/QnaList';
import QnaPage from './QnaPage';

export const metadata: Metadata = {
  title: '면학소 1:1 질의응답 페이지',
  description: '면학소 1:1 질의응답 페이지입니다.',
};

export default async function page() {
  return (
    <>
      <div className="flex flex-col">
        <h2 className="font-extrabold text-[30px] mb-10">1:1 질의응답</h2>
        <Link
          href="/mypage/tutee/qna/new"
          className="sm:text-sm px-2 py-1 text-white bg-main-green rounded-full w-fit"
        >
          + 질문 작성하기
        </Link>
        <QnaPage />
      </div>
    </>
  );
}
