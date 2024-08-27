import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { fetchProductlist } from '@/data/fetchMypage';
import { Metadata } from 'next';
import ManagementItem from './ManagementItem';

export const metadata: Metadata = {
  title: '면학소 강의 관리 페이지',
  description: '면학소 강의 관리 페이지입니다.',
};

async function Page({ searchParams }: { searchParams: { page: string } }) {
  const resData = await fetchProductlist(searchParams.page);

  const list = resData.item.map((item, index) => (
    <ManagementItem item={item} key={index} />
  ));
  console.log('resData===========>', resData);
  return (
    <div className="">
      <h2 className="font-extrabold text-[30px] mb-10">강의 관리</h2>
      <div className="w-full flex text-gray-90 font-bold text-center py-2 bg-gray-30 items-center">
        <h3 className="basis-2/12">이미지</h3>
        <h3 className="basis-3/12">강의명</h3>
        <h3 className="basis-1/12 sm:hidden">평점</h3>
        <h3 className="basis-2/12 sm:hidden">총 수강생</h3>
        <h3 className="basis-2/12">총 수입</h3>
        <h3 className="basis-2/12 sm:basis-4/12">관리</h3>
      </div>
      {list}
      <Pagination
        page={resData?.pagination?.page}
        totalPages={resData?.pagination?.totalPages}
      />
    </div>
  );
}

export default Page;
