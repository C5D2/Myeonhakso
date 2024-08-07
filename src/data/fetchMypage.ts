//{{url}}/orders

import { ApiRes, MultiItem } from '@/types';
import { Ilecture } from '@/types/lecture';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function fetchOrderlist(): Promise<Ilecture[]> {
  // path: string,
  // sort?: object,
  // limit?: string,
  const url = `${SERVER}/orders`;
  const res = await fetch(url, {
    headers: {
      'client-id': '00-sample',
    },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    throw new Error('게시물 목록 조회 실패');
  }
  return resJson.item;
}
