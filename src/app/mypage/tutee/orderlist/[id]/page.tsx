import OrderSaleItem from '@/components/OrderSaleItem';
import { fetchOrderitem } from '@/data/fetchMypage';

async function page({ params }: { params: { id: number } }) {
  // console.log('id', params.id);
  const data = await fetchOrderitem(params.id);

  return (
    <>
      <h2 className="font-extrabold text-[30px] mb-10">구매 상세 내역</h2>
      <OrderSaleItem item={data} />
    </>
  );
}

export default page;
