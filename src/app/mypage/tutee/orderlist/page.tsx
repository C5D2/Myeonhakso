import { getSession } from '@/auth';
import OrderSaleList from '@/components/OrderSaleList';
import { fetchOrderlist } from '@/data/fetchMypage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '면학소 구매 목록 페이지',
  description: '면학소 강의 구매 목록 페이지입니다.',
};

export default async function Page() {
  const data = await fetchOrderlist();

  const list = data.map((item, index) => (
    <OrderSaleList key={index} item={item} />
  ));
  return (
    <div className="">
      <h2 className="font-extrabold text-[30px] mb-10">구매 내역</h2>
      {list}
    </div>
  );
}
