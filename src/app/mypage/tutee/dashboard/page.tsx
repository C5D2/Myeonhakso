import { fetchOrderlist } from '@/data/fetchMypage';
import { Metadata } from 'next';
import { CategoryRate } from './CategoryRate';

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
      <div className="grid grid-flow-col grid-cols-12 grid-rows-9 gap-10 border border-red-500">
        <div className="col-span-6  border border-gray-30">
          <h3>최근 수강 강의</h3>
        </div>
        <div className="col-span-6 row-span-2 border border-gray-30">
          <h3>카테고리별 학습 현황</h3>
          {/* <Component /> */}
          <CategoryRate item={item} />
        </div>
        <div className="col-span-12 row-span-3 border border-gray-30">
          <h3>연간 학습 진행 현황</h3>
        </div>
        <div className="col-span-6 row-span-3  border border-gray-30">
          <h3>최근 1:1 질의응답</h3>
        </div>
        <div className="col-span-6 row-span-3 border border-gray-30">
          <h3>학습 일정</h3>
        </div>
      </div>
    </>
  );
}
