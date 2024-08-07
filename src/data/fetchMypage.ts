import { getSession } from '@/auth';
import { ApiRes, MultiItem, SingleItem } from '@/types';
import { IOrderSaleList } from '@/types/mypage';
// import useUserStore from '@/zustand/userStore';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function fetchOrderlist(): Promise<IOrderSaleList[]> {
  const session = await getSession();
  const accesstoken = session?.accessToken;
  // path: string,
  // sort?: object,
  // limit?: string,
  const url = `${SERVER}/orders`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<MultiItem<IOrderSaleList>> = await res.json();
  if (!resJson.ok) {
    throw new Error('구매 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchSalelist(): Promise<IOrderSaleList[]> {
  const session = await getSession();
  const accesstoken = session?.accessToken;
  // path: string,
  // sort?: object,
  // limit?: string,
  const url = `${SERVER}/seller/orders`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<MultiItem<IOrderSaleList>> = await res.json();
  if (!resJson.ok) {
    throw new Error('판매 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchOrderitem(id: number): Promise<IOrderSaleList> {
  const session = await getSession();
  const accesstoken = session?.accessToken;
  // path: string,
  // sort?: object,
  // limit?: string,
  const url = `${SERVER}/orders/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<SingleItem<IOrderSaleList>> = await res.json();
  if (!resJson.ok) {
    throw new Error('판매 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchSaleitem(id: number): Promise<IOrderSaleList> {
  const session = await getSession();
  const accesstoken = session?.accessToken;
  // path: string,
  // sort?: object,
  // limit?: string,
  const url = `${SERVER}/seller/orders/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<SingleItem<IOrderSaleList>> = await res.json();
  if (!resJson.ok) {
    throw new Error('판매 목록 조회 실패');
  }
  return resJson.item;
}

//{{url}}/seller/orders/4
