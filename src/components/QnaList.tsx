import { auth } from '@/auth';
import { IPost } from '@/types';
import Link from 'next/link';
import React from 'react';

async function QnaList({ item }: { item: IPost }) {
  const session = await auth();
  const typeLayout = session?.user?.type === 'seller' ? 'tutor' : 'tutee';

  return (
    <div className="px-5 mb-1 sm:px-1">
      <Link href={`/mypage/${typeLayout}/qna/${item._id}`}>
        <div className="p-5 rounded-lg border border-gray-30 flex items-center gap-5  sm:px-2 sm:py-1 sm:gap-2 sm:text-sm">
          {item.repliesCount > 0 ? (
            <span className="p-2 bg-blue-400 rounded-lg text-white text-sm sm:text-xs sm:max-h-8 sm:max-w-15 sm:shrink-0">
              답변 완료
            </span>
          ) : (
            <span className="p-2 bg-orange-400 rounded-lg text-white text-sm sm:text-xs">
              답변 대기
            </span>
          )}
          {item.title}
        </div>
      </Link>
    </div>
  );
}

export default QnaList;
