import OrderSaleItem from '@/components/OrderSaleItem';
import { fetchSaleitem } from '@/data/fetchMypage';

async function page({ params }: { params: { id: number } }) {
  const data = await fetchSaleitem(params.id);

  return (
    <>
      <h2 className="font-extrabold text-[30px] mb-10">판매 상세 내역</h2>

      <OrderSaleItem item={data} />
    </>
  );
}

export default page;
