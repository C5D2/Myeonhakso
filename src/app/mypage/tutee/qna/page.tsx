import { fetchQnaList } from '@/data/fetchMypage';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '면학소 1:1 질의응답 페이지',
  description: '면학소 1:1 질의응답 페이지입니다.',
};

export default async function page() {
  const resData = await fetchQnaList();
  // export default async function Page({searchParams}: {searchParams: {page: string}}) {
  //   const data = await fetchOrderlist(searchParams.page);

  //   const list = data?.item?.map((item, index) => (
  //     <OrderSaleList key={index} item={item} />
  //   ));

  return (
    <div className="">
      <h2 className="font-extrabold text-[30px] mb-10">1:1 질의응답</h2>
      <Link href="/mypage/tutee/qna">질문하기</Link>
      {/* {list} */}
      {/* <Pagination
      page={data?.pagination?.page}
      totalPages={data?.pagination?.totalPages}
    /> */}
    </div>
  );
}
