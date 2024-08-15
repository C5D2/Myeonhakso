import { ApiRes, MultiItem } from '@/types';
import { Ilecture } from '@/types/lecture';
import { NextApiRequest, NextApiResponse } from 'next';

const SERVER = process.env.SERVER_URL; // 환경 변수에서 서버 URL을 가져옵니다.
const CLIENT_ID = process.env.CLIENT_ID; // 환경 변수에서 클라이언트 ID를 가져옵니다.

async function fetchSearchLectures(keyword: string) {
  const url = `${SERVER}/products?keyword=${encodeURIComponent(keyword)}`;
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword } = req.query;

  if (typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Invalid keyword' });
  }

  try {
    const searchResults = await fetchSearchLectures(keyword);
    
    if (searchResults === null) {
      return res.status(404).json({ error: 'No results found' });
    }

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}