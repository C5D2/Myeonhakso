'use server';

import { CommentData } from '@/components/Comment';
import { getSession } from '@/auth';
import { ApiResWithValidation, IPost, IPostComment, SingleItem } from '@/types';
import { IReview, IReviewRegister } from '@/types/mypage';
import { revalidatePath } from 'next/cache';
import { IPostQna } from '@/app/mypage/tutee/qna/new/QnaForm';

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
): Promise<ApiResWithValidation<SingleItem<IPostComment>, IPostComment>> {
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
  revalidatePath('/mypage', 'layout');
  return data;
}

//{{url}}/posts
export async function postQna(
  formData: IPostQna,
): Promise<ApiResWithValidation<SingleItem<IPost>, IPost>> {
  const session = await getSession();

  const res = await fetch(`${SERVER}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '07-myeonhakso',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  revalidatePath('/mypage', 'layout');
  return data;
}
