import { fetchOrderProduct } from '@/data/fetchMypage';
import { Metadata } from 'next';
import { CategoryRate } from './CategoryRate';
import { AnnualRate } from './AnnualRate';
import RecentLecture from './RecentLecture';
import LectureCalendar from './LectureCalendar';
import Link from 'next/link';
import QnaPage from '../qna/QnaPage';

export const metadata: Metadata = {
  title: '면학소 대시보드 페이지',
  description: '면학소 학생 대시보드 페이지입니다.',
};

export default async function Page() {
  //fetchOrderlist
  const { item } = await fetchOrderProduct();
  // item?.products.map(item => console.log(item));

  return (
    <>
      <h2 className="font-extrabold text-[30px] mb-10">대시보드</h2>
      <div className="grid grid-flow-col grid-cols-12 grid-rows-9 gap-5 p-5 place-items-center sm:grid-rows-11">
        <div className="col-span-6 border border-gray-30 rounded-2xl w-full h-full sm:col-span-12">
          <div className="flex flex-col items-center h-full">
            <div className="border-b w-full border-gray-30 p-5 flex ">
              <h3 className="font-semibold mr-auto">최근 수강 강의</h3>
              <Link
                href="/mypage/tutee/orderlist"
                className="text-sm text-gray-50 "
              >
                강의 목록 {'>'}
              </Link>
            </div>
            <div className="h-full w-full flex justify-center items-center">
              <RecentLecture item={item[0]} />
            </div>
          </div>
        </div>
        <div className="col-span-6 row-span-2 border border-gray-30 rounded-2xl w-full h-full sm:col-span-12">
          <h3 className="font-semibold border-b border-gray-30 p-5 ">
            카테고리별 학습 현황
          </h3>
          <div className="flex flex-col justify-center h-full">
            <CategoryRate item={item} />
          </div>
        </div>
        <div className="col-span-12 row-span-3 border border-gray-30 rounded-2xl w-full h-full sm:row-span-2">
          <h3 className="font-semibold p-5 border-b border-gray-30">
            연간 학습 진행 현황
          </h3>
          <AnnualRate item={item} />
        </div>
        <div className="col-span-12 row-span-3 border border-gray-30 rounded-2xl w-full h-full sm:col-span-12 sm:row-span-2">
          <h3 className="font-semibold p-5 border-b border-gray-30">
            최근 1:1 질의응답
          </h3>
          <QnaPage />
        </div>
        <div className="col-span-6 row-span-3 border border-gray-30 rounded-2xl w-full h-full sm:col-span-12 sm:row-span-4">
          <h3 className="font-semibold p-5 border-b border-gray-30">
            학습 일정
          </h3>
          <LectureCalendar item={item} />
        </div>
      </div>
    </>
  );
}
