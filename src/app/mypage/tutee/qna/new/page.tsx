import QnaForm from './QnaForm';
import { fetchOrderlist } from '@/data/fetchMypage';

async function page({ searchParams }: { searchParams: URLSearchParams }) {
  // sea;
  const prodId = Object.keys(searchParams)[0];

  const data = await fetchOrderlist();
  const productData = data?.item?.flatMap(item => item.products);

  // const list = data?.item?.map((item, index) => (
  //   <OrderSaleList key={index} item={item} />
  // ));

  return <QnaForm product={productData} prodId={Number(prodId)} />;
}

export default page;
