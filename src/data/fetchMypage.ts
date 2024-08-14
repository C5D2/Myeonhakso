import { getSession } from '@/auth';
import { ApiRes, MultiItem, SingleItem } from '@/types';
import { Ilecture } from '@/types/lecture';
import { IOrderSaleList } from '@/types/mypage';
// import useUserStore from '@/zustand/userStore';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;


export async function fetchOrderlist(
  page?: string,
): Promise<MultiItem<IOrderSaleList>> {
  const params = new URLSearchParams();
  page && params.set('page', page);
  params.set('limit', '4');
  const session = await getSession();
  const accesstoken = session?.accessToken;

  const url = `${SERVER}/orders?${params.toString()}`;
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
  return resJson;
}

export async function fetchSalelist(
  page?: string,
): Promise<MultiItem<IOrderSaleList>> {
  const params = new URLSearchParams();
  page && params.set('page', page);
  params.set('limit', '4');
  const session = await getSession();
  const accesstoken = session?.accessToken;

  const url = `${SERVER}/seller/orders?${params.toString()}`;
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
  return resJson;
}

export async function fetchOrderitem(id: number): Promise<IOrderSaleList> {
  const session = await getSession();
  const accesstoken = session?.accessToken;
  const url = `${SERVER}/orders/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<SingleItem<IOrderSaleList>> = await res.json();
  if (!resJson.ok) {
    throw new Error('구매 상세 조회 실패');
  }
  return resJson.item;
}

export async function fetchSaleitem(id: number): Promise<IOrderSaleList> {
  const session = await getSession();
  const accesstoken = session?.accessToken;
  const url = `${SERVER}/seller/orders/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<SingleItem<IOrderSaleList>> = await res.json();
  if (!resJson.ok) {
    throw new Error('판매 상세 정보 조회 실패');
  }
  return resJson.item;
}

export async function fetchProductlist(
  page?: string,
): Promise<MultiItem<Ilecture>> {
  const params = new URLSearchParams();
  page && params.set('page', page);
  params.set('limit', '6');
  const session = await getSession();
  const accesstoken = session?.accessToken;

  const url = `${SERVER}/seller/products?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    throw new Error('판매 상품 조회 실패');
  }
  return resJson;
}

//{{url}}/orders?sort={"createdAt":-1}&limit=1

export async function fetchRecentProduct(
  page?: string,
): Promise<MultiItem<Ilecture>> {
  const params = new URLSearchParams();
  page && params.set('page', page);
  params.set('limit', '6');
  const session = await getSession();
  const accesstoken = session?.accessToken;

  const url = `${SERVER}/seller/products?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    throw new Error('판매 상품 조회 실패');
  }
  return resJson;
}
