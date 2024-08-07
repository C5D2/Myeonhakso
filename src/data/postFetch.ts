import { ApiRes, MultiItem, Post, SingleItem } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
const DELAY = process.env.NEXT_PUBLIC_DELAY;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function fetchPosts(
  type: string | undefined,
  page?: string,
  keyword?: string,
): Promise<Post[]> {
  const params = new URLSearchParams();
  type && params.set('type', type);
  page && params.set('page', page);
  keyword && params.set('keyword', keyword);
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);
  const url = `${SERVER}/posts?${params.toString()}`;
  const res = await fetch(url);
  const resJson: ApiRes<MultiItem<Post>> = await res.json();
  if (!resJson.ok) {
    throw new Error('게시물 목록 조회 실패');
  }
  return resJson.item;
}

//export async function fetchPost(path: string) {
//const url = `${SERVER}/${path}`;

export async function fetchPost(_id: string) {
  const url = `${SERVER}/posts/${_id}`;

  const res = await fetch(url);
  const resJson: ApiRes<SingleItem<Post>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}

export const fetchEmailValidation = async (email: string) => {
  try {
    const response = await fetch(`${SERVER}/users/email?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error during email validation:', error);
    throw error;
  }
};

