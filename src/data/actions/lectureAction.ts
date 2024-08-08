'use server';

import { getSession } from '@/auth';
import { ApiResWithValidation, SingleItem } from '@/types';
import { Ilecture, ILectureRegister } from '@/types/lecture';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function postForm(
  formData: ILectureRegister,
): Promise<ApiResWithValidation<SingleItem<Ilecture>, ILectureRegister>> {
  const session = await getSession();

  const res = await fetch(`${SERVER}/seller/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '07-myeonhakso',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  console.log('data', data);
  return data;
}