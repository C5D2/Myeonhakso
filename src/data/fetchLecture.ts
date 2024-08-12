import { getSession } from '@/auth';
import { ApiRes, MultiItem, SingleItem } from '@/types';
import {
  Ilecture,
  ILectureDetail,
  ILectureOrder,
  ILectureOrderDetail,
  ILectureOrderResponse,
} from '@/types/lecture';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_CARD_LIMIT;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function fetchLecture(
  path: string,
  sort?: object,
  // limit?: string,
): Promise<Ilecture[]> {
  const params = new URLSearchParams();
  sort && params.set('sort', JSON.stringify(sort));
  params.set('limit', LIMIT!);
  const url = `${SERVER}/${path}?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    throw new Error('게시물 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchCategory(
  path: string,
  type?: object,
  page?: string,
): Promise<MultiItem<Ilecture>> {
  const params = new URLSearchParams();
  type && params.set('custom', JSON.stringify(type));
  page && params.set('page', page);
  params.set('limit', '4');
  const url = `${SERVER}/${path}?${params.toString()}`;
  console.log('url', url);

  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },

    next: { revalidate: 10 },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    throw new Error('카테고리 게시물 목록 조회 실패');
  }
  return resJson;
}

export async function fetchLectureDetail(_id: string) {
  const url = `${SERVER}/products/${_id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },
  });
  const resJson: ApiRes<SingleItem<ILectureDetail>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}

export async function fetchOtherLectures(_id: string, limit: string) {
  const url = `${SERVER}/products?seller_id=${_id}&limit=${limit}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}

// export async function fetchOrderDetail(_id: string) {
//   const session = await getSession();
//   const accessToken = session?.accessToken;
//   const url = `${SERVER}/orders/${_id}`;
//   const res = await fetch(url, {
//     headers: {
//       'client-id': `${CLIENT_ID}`,
//       Authorization: `${accessToken}`,
//     },
//   });
//   const resJson: ApiRes<SingleItem<ILectureOrderDetail>> = await res.json();
//   if (!resJson.ok) {
//     return null;
//   }
//   return resJson.item;
// }
