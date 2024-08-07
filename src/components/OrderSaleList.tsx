'use client';

import { IOrderSaleList } from '@/types/mypage';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type itemParam = {
  item: IOrderSaleList;
};

export default function OrderList({ item }: itemParam) {
  const path = usePathname();
  const p = path.split('/');
  const type = p[2];
  const listName = p[3];

  return (
    <div className="p-5">
      <div className="flex items-center p-2">
        <p>주문 날짜 {item?.createdAt}</p>
        <Link
          href={`/mypage/${type}/${listName}/${item?._id}`}
          className="ml-auto flex items-center"
        >
          <p className="">주문 상세</p>
          <img src="/right-arrow.svg" className="w-6 h-6" />
        </Link>
      </div>
      <div className="flex border border-black rounded-xl p-10">
        <div className="결제완료">
          <div className="flex gap-10 items-center text-gray-90 mb-5 text-sm">
            <p className="bg-main-green w-fit px-2 py-1 rounded-md font-bold text-white">
              결제완료
            </p>
            {/* <p>
              주문번호 {item?.createdAt}
              {item?._id}
            </p> */}
          </div>
          {item?.products?.length === 1 ? (
            <h4 className="text-gray-90 font-bold">{item?.products[0].name}</h4>
          ) : (
            <h4 className="text-gray-90 font-bold">
              {item?.products[0]?.name}
              <span className="font-bold text-black">
                {' '}
                외 {item?.products?.length - 1}건
              </span>
            </h4>
          )}
        </div>
        <div className="ml-auto mt-auto">
          {item?.products.map((item, index) => (
            <p className="text-right text-gray-50" key={index}>
              ₩{item?.price}
            </p>
          ))}
          <p className="border-t border-gray-30"> 합계 ₩{item?.cost?.total}</p>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { ApiRes, MultiItem, SingleItem } from '@/types';
// import { IOrderList, IOrderSaleList } from '@/types/mypage';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// type itemParam = {
//   item: IOrderSaleList;
// };

// export default function OrderSaleList({ item }: itemParam) {
//   console.log('item', item);
//   const path = usePathname();
//   const p = path.split('/');
//   const type = p[2];
//   const listName = p[3];
//   let itemName;

//   // console.log(p);
//   // console.log(item?._id, '갯수', item?.products?.length);
//   console.log('type', type);

//   if (type === 'tutee') {
//     if (item?.products?.length === 1) {
//       itemName = (
//         <h4 className="text-gray-90 font-bold">{item?.products[0]?.name}</h4>
//       );
//       console.log('tutee, 외 1건일 때');
//     } else {
//       itemName = (
//         <h4 className="text-gray-90 font-bold">
//           {item?.products[0]?.name}
//           <span className="font-bold text-black">
//             {' '}
//             외 {item?.products?.length - 1}건
//           </span>
//         </h4>
//       );
//       console.log('tutee, 진짜 1건일 때');
//     }
//   } else if (type === 'tutor') {
//     itemName = <h4 className="text-gray-90 font-bold">{item?.name}</h4>;
//     console.log('tutor 해당됨', itemName);
//   }

//   return (
//     <div className="p-5">
//       <div className="flex items-center p-2">
//         <p>주문 날짜 {item?.createdAt}</p>
//         <Link
//           href={`/mypage/${type}/${listName}/${item?._id}`}
//           className="ml-auto flex items-center"
//         >
//           <p className="">주문 상세</p>
//           <img src="/right-arrow.svg" className="w-6 h-6" />
//         </Link>
//       </div>
//       <div className="flex border border-black rounded-xl p-10">
//         <div className="결제완료">
//           <div className="flex gap-10 items-center text-gray-90 mb-5 text-sm">
//             <p className="bg-main-green w-fit px-2 py-1 rounded-md font-bold text-white">
//               결제완료
//             </p>
//           </div>
//           {itemName}
//         </div>
//         <div className="ml-auto mt-auto">
//           {type === 'tutee' && <p> 합계 {item?.cost?.total}</p>}
//           {type === 'tutor' && <p> 합계 {item?.cost?.total}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }
