import QnaForm from './QnaForm';
import { fetchOrderlist } from '@/data/fetchMypage';

async function page() {
  const data = await fetchOrderlist();
  const productData = data?.item?.flatMap(item => item.products);
  console.log('productData========>', productData);

  // const list = data?.item?.map((item, index) => (
  //   <OrderSaleList key={index} item={item} />
  // ));

  return <QnaForm product={productData} />;
}

export default page;
