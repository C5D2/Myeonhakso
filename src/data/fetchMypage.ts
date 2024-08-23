import { getSession } from '@/auth';
import { ApiRes, IPost, MultiItem, SingleItem } from '@/types';
import { Ilecture } from '@/types/lecture';
import { IOrderSaleList } from '@/types/mypage';
// import useUserStore from '@/zustand/userStore';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function fetchOrderlist(
  page?: string,
  sort?: string,
): Promise<MultiItem<IOrderSaleList>> {
  const params = new URLSearchParams();
  page && params.set('page', page);
  sort && params.set('sort', sort);
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

//{{url}}/posts/users?type=qna
// auth 넘겨야함
export async function fetchQnaList(): Promise<MultiItem<IPost>> {
  const params = new URLSearchParams();
  params.set('type', 'qna');
  const session = await getSession();
  const accesstoken = session?.accessToken;

  const url = `${SERVER}/posts?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<MultiItem<IPost>> = await res.json();
  if (!resJson.ok) {
    throw new Error('질의응답 목록 조회 실패');
  }
  return resJson;
}

export async function fetchQnaItem(id: number): Promise<IPost> {
  //{{url}}/posts/4 상세조회
  const session = await getSession();
  const accesstoken = session?.accessToken;

  const url = `${SERVER}/posts/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<SingleItem<IPost>> = await res.json();
  if (!resJson.ok) {
    throw new Error('질의응답 상세 정보 조회 실패');
  }
  return resJson.item;
}

export async function fetchOrderProduct(): Promise<MultiItem<IOrderSaleList>> {
  const session = await getSession();
  const accesstoken = session?.accessToken;

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
  return resJson;
}

//{{url}}/seller/products
export async function fetchsaleProduct(): Promise<MultiItem<Ilecture>> {
  const session = await getSession();
  const accesstoken = session?.accessToken;

  const url = `${SERVER}/seller/products`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    throw new Error('대시보드 판매 상품 조회 실패');
  }
  return resJson;
}

//anual..
export async function fetchSellerOrderlist(
  page?: string,
): Promise<IOrderSaleList[]> {
  const params = new URLSearchParams();
  const session = await getSession();
  const accesstoken = session?.accessToken;
  params.set('limit', '6');

  const url = `${SERVER}/seller/orders?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  const resJson: ApiRes<MultiItem<IOrderSaleList>> = await res.json();
  if (!resJson.ok) {
    throw new Error('셀러의 주문 목록 조회 실패');
  }
  return resJson.item;
}
