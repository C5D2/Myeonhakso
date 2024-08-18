import { fetchOrderlist } from '@/data/fetchMypage';
import { Metadata } from 'next';
import { CategoryRate } from './CategoryRate';
import { AnnualRate } from './AnnualRate';
import RecentLecture from './RecentLecture';
import LectureCalendar from './LectureCalendar';

export const metadata: Metadata = {
  title: '면학소 대시보드 페이지',
  description: '면학소 학생 대시보드 페이지입니다.',
};

export default async function Page() {
  //fetchOrderlist
  const { item } = await fetchOrderlist();
  // item?.products.map(item => console.log(item));

  return (
    <>
      <div className="">
        <h2 className="font-extrabold text-[30px] mb-10">대시보드</h2>
      </div>
      <div className="grid grid-flow-col grid-cols-12 grid-rows-9 border gap-5 border-red-500 p-5 place-items-center">
        <div className="col-span-6 border border-gray-30 p-5 rounded-2xl w-full h-full">
          <h3 className="font-semibold">최근 수강 강의</h3>
          <RecentLecture />
        </div>
        <div className="col-span-6 row-span-2 border border-gray-30 p-5 rounded-2xl w-full h-full ">
          <h3 className="font-semibold">카테고리별 학습 현황</h3>
          <div className="flex flex-col justify-center h-full">
            <CategoryRate item={item} />
          </div>
        </div>
        <div className="col-span-12 row-span-3 border border-gray-30 p-5 rounded-2xl w-full h-full">
          <h3 className="font-semibold">연간 학습 진행 현황</h3>
          <AnnualRate item={item} />
        </div>
        <div className="col-span-6 row-span-3  border border-gray-30 p-5 rounded-2xl w-full h-full">
          <h3 className="font-semibold">최근 1:1 질의응답</h3>
        </div>
        <div className="col-span-6 row-span-3 border border-gray-30 p-5 rounded-2xl w-full h-full">
          <h3 className="font-semibold">학습 일정</h3>
          <LectureCalendar />
        </div>
      </div>
    </>
  );
}
