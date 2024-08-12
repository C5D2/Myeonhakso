'use server';

import { getSession } from '@/auth';
import { ApiResWithValidation, SingleItem } from '@/types';
import { IReview, IReviewRegister } from '@/types/mypage';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function postReview(
  formData: IReviewRegister,
): Promise<ApiResWithValidation<SingleItem<IReview>, IReviewRegister>> {
  const session = await getSession();

  const res = await fetch(`${SERVER}/replies`, {
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
