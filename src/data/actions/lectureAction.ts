'use server';

import { getSession } from '@/auth';
import { ApiResWithValidation, SingleItem } from '@/types';
import {
  Ilecture,
  ILectureOrder,
  ILectureOrderResponse,
  ILectureRegister,
} from '@/types/lecture';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function postForm(
  formData: ILectureRegister,
): Promise<ApiResWithValidation<SingleItem<Ilecture>, ILectureRegister>> {
  const session = await getSession();

  const res = await fetch(`${SERVER}/seller/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  console.log('data', data);
  return data;
}

export async function orderLecture(
  data: ILectureOrder,
): Promise<
  ApiResWithValidation<SingleItem<ILectureOrderResponse>, ILectureOrder>
> {
  const session = await getSession();

  const res = await fetch(`${SERVER}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  console.log('data', resData);
  return resData;
}

export async function postLectureBookmark(id: string) {
  const session = await getSession();

  const res = await fetch(`${SERVER}/bookmarks/product/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const resData = await res.json();
  console.log('data', resData);
  return resData;
}

// 북마크 id
export async function deleteLectureBookmark(id: string) {
  const session = await getSession();

  const res = await fetch(`${SERVER}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const resData = await res.json();
  console.log('data', resData);
  return resData;
}
