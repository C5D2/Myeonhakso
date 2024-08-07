import OrderSaleList from '@/components/OrderSaleList';
import { fetchOrderlist, fetchSalelist } from '@/data/fetchMypage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '면학소 판매 목록 페이지',
  description: '면학소 강의 판매 목록 페이지입니다.',
};

async function Page() {
  // const data = await fetchSalelist();
  const data = await fetchSalelist();

  const list = data.map((item, index) => (
    <OrderSaleList key={index} item={item} />
  ));

  return (
    <div className="">
      <h2 className="font-extrabold text-[30px] mb-10">판매 내역</h2>
      {list}
    </div>
  );
}

export default Page;
