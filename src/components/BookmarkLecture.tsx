'use client';

import { useEffect, useState } from 'react';
import { useFetchBookmark } from '@/hooks/useBookmarkActions';
import { GetAuthInfo } from '@/utils/authUtils';
import {
  deleteBookmark,
  postLectureBookmark,
} from '@/data/actions/lectureAction';
import { IBookmark } from '@/types/lecture';
import Bookmark from '@/components/icons/Bookmark';
import { Slide, toast } from 'react-toastify';

export default function BookmarkLecture({
  params,
  initialIsBookmarked,
  bookmarkId: initialBookmarkId,
  type,
}: {
  params: { id: string };
  initialIsBookmarked: boolean;
  bookmarkId: number | null;
  type: string | undefined;
}) {
  const { data, isLoading, mutate } = useFetchBookmark();
  const { user } = GetAuthInfo();
  const id = Number(params.id);

  // 로컬로 북마크 여부 관리
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [bookmarkId, setBookmarkId] = useState<number | null>(
    initialBookmarkId,
  );

  // 데이터가 로드된 후 북마크 상태 설정
  useEffect(() => {
    if (!isLoading && data) {
      const isAlreadyBookmarked = data.some(
        (data: IBookmark) => data.product?._id === id,
      );
      setIsBookmarked(isAlreadyBookmarked);
      if (isAlreadyBookmarked) {
        const bookmark = data.find(
          (data: IBookmark) => data.product?._id === id,
        );
        if (bookmark) {
          setBookmarkId(bookmark._id);
        }
      }
    }
  }, [data, isLoading, id]);

  console.log(data);

  const bookmarkData = {
    target_id: id,
    extra: {
      type,
    },
  };

  const handleBookmarkToggle = async () => {
    console.log('handleBookmarkToggle 시작', { isBookmarked, bookmarkId });

    if (!user) {
      return;
    }

    const updatedData = isBookmarked
      ? data.filter((bookmark: any) => bookmark.product?._id !== id) // 북마크 삭제
      : [
          ...(data || []),
          { product: { _id: id }, isBookmarked: true }, // 북마크 추가
        ];

    // 로컬 상태 업데이트하여 UI에서 즉시 반영
    setIsBookmarked(!isBookmarked);
    mutate(updatedData, false);
    console.log(updatedData);

    try {
      // 서버에 요청
      if (isBookmarked) {
        const deleteResult = await deleteBookmark(String(bookmarkId));
        console.log('deleteLectureBookmark 결과:', deleteResult);
      } else {
        const result = await postLectureBookmark(bookmarkData);
        console.log('postLectureBookmark 결과:', result);

        // 새로 갱신된 북마크 ID 업데이트
        const newBookmark = updatedData.find(
          (bookmark: any) => bookmark.product?._id === id,
        );
        if (newBookmark) {
          setBookmarkId(newBookmark._Id);
        }
      }

      // 서버 데이터로 다시 동기화
      mutate();
    } catch (error) {
      console.error('북마크 처리 실패:', error);
      // 실패할 경우 원래 데이터로 롤백
      setIsBookmarked(isBookmarked); // 원래 상태로 롤백
      mutate(data, false);
      toast('일시적인 오류가 발생했습니다. 다시 시도해주세요.', {
        position: 'top-center',
        transition: Slide,
      });
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleBookmarkToggle}>
      <Bookmark
        width={40}
        height={40}
        fill={isBookmarked ? '#fac56c' : 'gray'}
        stroke={'current'}
      />
    </div>
  );
}
