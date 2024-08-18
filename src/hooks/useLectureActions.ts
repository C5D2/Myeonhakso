import { deleteForm } from '@/data/actions/lectureAction';
import { GetAuthInfo } from '@/utils/authUtils';
import useSWR from 'swr';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export function useFetchLecture() {
  // const { accessToken } = GetAuthInfo();

  // const fetcher = async (url: string) => {
  //   const response = await fetch(url, {
  //     headers: {
  //       'Client-ID': CLIENT_ID || '',
  //       Authorization: `Bearer ${accessToken || ''}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch bookmarks');
  //   }

  //   return response.json();
  // };

  // const { data, error, mutate } = useSWR(
  //   SERVER && accessToken ? `${SERVER}/seller/products` : null,
  //   fetcher,
  // );

  // return {
  //   data: data?.item || [],
  //   isLoading: !error && !data,
  //   isError: error,
  //   mutate,
  // };
  const deleteLecture = async (itemId: string) => {
    try {
      await deleteForm(itemId);
      return true;
    } catch (error) {
      console.error('삭제 실패:', error);
      throw error;
    }
  };

  return {
    deleteLecture,
  };
}
