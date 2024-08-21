'use server';

import { CommentData } from '@/components/Comment';
import { getSession } from '@/auth';
import { ApiResWithValidation, SingleItem } from '@/types';
import { IReview, IReviewRegister } from '@/types/mypage';
import { revalidatePath } from 'next/cache';

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
  return data;
}

///posts/4/replies
export async function postComment(
  id: number,
  formData: CommentData,
): Promise<ApiResWithValidation<SingleItem<IReview>, IReviewRegister>> {
  const session = await getSession();

  const res = await fetch(`${SERVER}/posts/${id}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '07-myeonhakso',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  revalidatePath('/mypage/', 'layout');
  return data;
}
