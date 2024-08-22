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
  return data;
}

export async function patchForm(
  id: string,
  formData: ILectureRegister,
): Promise<ApiResWithValidation<SingleItem<Ilecture>, ILectureRegister>> {
  const session = await getSession();

  const res = await fetch(`${SERVER}/seller/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function deleteForm(id: string) {
  const session = await getSession();

  const res = await fetch(`${SERVER}/seller/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data = await res.json();
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
  return resData;
}

export async function postLectureBookmark(id: string, data: object) {
  const session = await getSession();

  const res = await fetch(`${SERVER}/bookmarks/product/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
}

// 북마크 id
export async function deleteBookmark(id: string) {
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
  return resData;
}

export async function postTeacherBookmark(id: string) {
  const session = await getSession();

  const res = await fetch(`${SERVER}/bookmarks/user/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const resData = await res.json();
  return resData;
}
