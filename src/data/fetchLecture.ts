import { getSession } from '@/auth';
import { ApiRes, ITeacher, MultiItem, SingleItem, UserData } from '@/types';
import {
  Ilecture,
  ILectureDetail,
  ILectureReview,
  INotification,
} from '@/types/lecture';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_CARD_LIMIT;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// function delay(ms: any) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

export async function fetchLecture(
  path: string,
  sort?: object,
  limit?: string,
): Promise<Ilecture[]> {
  const params = new URLSearchParams();
  sort && params.set('sort', JSON.stringify(sort));
  if (limit) {
    params.set('limit', limit.toString());
  } else {
    params.set('limit', LIMIT!);
  }
  // params.set('limit', LIMIT!);
  const url = `${SERVER}/${path}?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },
    next: { revalidate: 10 },
  });

  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    throw new Error('게시물 목록 조회 실패');
  }
  return resJson.item;
}

//회원 조회
export async function fetchTeacher(): Promise<ITeacher[]> {
  const params = new URLSearchParams();
  params.set('type', 'seller');
  params.set('limit', LIMIT!);
  const url = `${SERVER}/users?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },
  });

  const resJson: ApiRes<MultiItem<ITeacher>> = await res.json();
  if (!resJson.ok) {
    throw new Error('선생님 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchCategory(
  // path: string,
  type?: object,
  page?: string,
  sort?: object,
  keyword?: string,
): Promise<MultiItem<Ilecture>> {
  console.log('type, page, sort', type, page, sort);
  const params = new URLSearchParams();
  type && params.set('custom', JSON.stringify(type));
  page && params.set('page', page);
  sort && params.set('sort', JSON.stringify(sort));
  keyword && params.set('keyword', keyword);
  console.log('keyword', JSON.stringify(keyword));
  params.set('limit', LIMIT!);
  // const url = `${SERVER}/${path}?${params.toString()}`;
  const url = `${SERVER}/products?${params.toString()}`;
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
    next: { revalidate: 10 },
  });
  const resJson: ApiRes<MultiItem<Ilecture>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}

export async function fetchSearchLectures(keyword: string) {
  const url = `${SERVER}/products?keyword=${keyword}`;
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

export async function fetchBookmark(type = 'product') {
  const session = await getSession();

  if (!session) {
    console.error('세션 없음');
    return { item: [] };
  }

  const res = await fetch(`${SERVER}/bookmarks/${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    console.error('API 호출 에러:', res.statusText);
    throw new Error('API 호출 실패');
  }

  const resData = await res.json();
  console.log('API 응답:', resData);
  return resData;
}

export async function fetchBookmarkedUserList(id: number) {
  const res = await fetch(`${SERVER}/users/${id}/bookmarks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
    },
  });

  if (!res.ok) {
    console.error('API 호출 에러:', res.statusText);
    throw new Error('API 호출 실패');
  }

  const resData = await res.json();
  console.log('API 응답:', resData);
  return resData;
}

export const fetchNotificationList = async (): Promise<INotification[]> => {
  console.log('Fetching notifications...');
  try {
    const response = await fetch(`/api/notifications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API response:', response);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(
        'API call error:',
        response.status,
        response.statusText,
        errorMessage,
      );
      throw new Error(`API 호출 실패: ${response.status} ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Received data:', data);

    return data;
  } catch (error) {
    console.error('fetchNotificationList error:', error);
    throw error;
  }
};

export async function fetchReview(_id: number) {
  const url = `${SERVER}/replies/products/${_id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },
  });
  const resJson: ApiRes<MultiItem<ILectureReview>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}
