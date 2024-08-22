import { fetchsaleProduct } from '@/data/fetchMypage';
import { Metadata } from 'next';
import LectureCalendar from '../../tutee/dashboard/LectureCalendar';
import RecentLecture from '../../tutee/dashboard/RecentLecture';
import LectureRevenue from './LectureRevenue';
import LectureRating from './LectureRating';
import BookmarkCount from './BookmarkCount';
import StudentCount from './StudentCount';

export const metadata: Metadata = {
  title: '면학소 대시보드 페이지',
  description: '면학소 강사 대시보드 페이지입니다.',
};

export default async function Page() {
  const { item } = await fetchsaleProduct();
  console.log('item', item);
  return (
    <>
      <h2 className="font-extrabold text-[30px] mb-10">대시보드</h2>
      <div className=" grid grid-flow-col grid-cols-12 grid-rows-8 gap-5 p-5 place-items-center">
        <div className="col-span-6 row-span-3 border border-gray-30 rounded-2xl w-full h-full ">
          <div className="font-semibold p-5 border-b border-gray-30">
            <h3 className="font-semibold mr-auto">강의 일정</h3>
          </div>
          <LectureCalendar item={item} />
        </div>
        <div className="col-span-4 row-span-2 border border-gray-30 rounded-2xl w-full h-full">
          <div className="flex flex-col items-center h-full">
            <div className="border-b w-full border-gray-30 p-5">
              <h3 className="font-semibold mr-auto">평점</h3>
            </div>
            <LectureRating item={item} />
          </div>
        </div>
        <div className="col-span-12 row-span-3 border border-gray-30 rounded-2xl w-full h-full">
          <div className="flex flex-col items-center h-full">
            <div className="border-b w-full border-gray-30 p-5">
              <h3 className="font-semibold mr-auto">수익 종합 차트</h3>
            </div>
            수익종합
            {/* 여기 */}
          </div>
        </div>
        <div className="col-span-4 row-span-2 border border-gray-30 rounded-2xl w-full h-full">
          <div className="flex flex-col items-center h-full">
            <div className="border-b w-full border-gray-30 p-5">
              <h3 className="font-semibold mr-auto">총 수강생 수</h3>
            </div>
            <StudentCount item={item} />
            {/* <LectureRevenue item={item} /> */}
          </div>
        </div>
        <div className="col-span-6 row-span-3 border border-gray-30 rounded-2xl w-full h-full">
          <div className="flex items-center border-b border-gray-30 p-5">
            <h3 className="font-semibold mr-auto">강의 수익</h3>
          </div>
          <div className="p-3">
            <LectureRevenue item={item} />
          </div>
        </div>

        <div className="col-span-4 row-span-2 border border-gray-30 rounded-2xl w-full h-full">
          <div className="flex flex-col items-center h-full">
            <div className="border-b w-full border-gray-30 p-5">
              <h3 className="font-semibold mr-auto">북마크 수</h3>
            </div>
            <BookmarkCount item={item} />
          </div>
        </div>
      </div>
    </>
  );
}
