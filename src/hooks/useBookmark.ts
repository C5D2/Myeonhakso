// import useSWR from 'swr';
// import { fetchLectureBookmark } from '@/data/fetchLecture';

import { GetAuthInfo } from '@/utils/authUtils';
import useSWR from 'swr';

// export function useLectureBookmark() {
//   const { data, error, mutate } = useSWR(
//     'lectureBookmark',
//     fetchLectureBookmark,
//     {
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//     },
//   );

//   console.log('SWR 데이터:', data);

//   return {
//     data: data?.item || [],
//     isLoading: !error && !data,
//     isError: error,
//     mutate,
//   };
// }

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export function useBookmark(type = 'product') {
  const { accessToken } = GetAuthInfo();

  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        'Client-ID': CLIENT_ID || '',
        Authorization: `Bearer ${accessToken || ''}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }

    return response.json();
  };

  const { data, error, mutate } = useSWR(
    SERVER && accessToken ? `${SERVER}/bookmarks/${type}` : null,
    fetcher,
  );

  return {
    data: data?.item || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
