'use client';

import Button from '@/components/Button';
import {
  deleteBookmark,
  postTeacherBookmark,
} from '@/data/actions/lectureAction';
import { useFetchBookmark } from '@/hooks/useBookmarkActions';
import { IBookmark } from '@/types/lecture';
import { GetAuthInfo } from '@/utils/authUtils';
import { useEffect, useState } from 'react';

interface SubscribeButtonProps {
  initialIsSubscribed: boolean;
  teacherId: string | undefined;
  subscribeId: string | null | undefined;
}

export default function SubscribeButton({
  initialIsSubscribed,
  teacherId,
  subscribeId: initialSubscribeId,
}: SubscribeButtonProps) {
  const { data, isLoading, mutate } = useFetchBookmark('user');
  const { user } = GetAuthInfo();

  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
  const [subscribeId, setSubscribeId] = useState(initialSubscribeId);

  useEffect(() => {
    if (!isLoading && data) {
      const isAlreadySubscribed = data.some(
        (data: IBookmark) => data.user?._id === Number(teacherId),
      );
      setIsSubscribed(isAlreadySubscribed);
      if (isAlreadySubscribed) {
        const subscribe = data.find(
          (data: IBookmark) => data.user?._id === Number(teacherId),
        );
        if (subscribe) {
          setSubscribeId(subscribe._id);
        }
      }
    }
  }, [data, isLoading, teacherId]);

  const handleSubscribeToggle = async () => {
    if (!teacherId) {
      console.error('선생님 id를 찾을 수 없습니다.');
      alert('선생님 정보를 찾을 수 없습니다.');
      return;
    }
    if (!user) {
      return;
    }

    const newSubscribedState = !isSubscribed;
    setIsSubscribed(newSubscribedState);

    const updatedData = newSubscribedState
      ? [...(data || []), { user: { _id: teacherId }, isSubscribed: true }] // 북마크 추가
      : data.filter((bookmark: any) => bookmark.user?._id !== teacherId); // 북마크 삭제

    mutate(updatedData, false); // 클라이언트 상태 업데이트

    try {
      if (newSubscribedState) {
        await postTeacherBookmark(teacherId); // 구독 추가
      } else {
        if (subscribeId) {
          await deleteBookmark(subscribeId); // 구독 해지
        } else {
          throw new Error('구독 id를 찾을 수 없습니다.');
        }
      }

      mutate();
    } catch (error) {
      console.error('구독 처리 실패:', error);
      setIsSubscribed(!newSubscribedState); // 이전 상태로 복원
      alert('일시적인 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Button size="lg" radius="md" onClick={handleSubscribeToggle}>
      <span className="text-2xl font-black">
        {isSubscribed ? '구독 해지하기' : '선생님 구독하기'}
      </span>
    </Button>
  );
}
