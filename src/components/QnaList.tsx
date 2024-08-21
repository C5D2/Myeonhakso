import { auth } from '@/auth';
import { IPost } from '@/types';
import Link from 'next/link';
import React from 'react';

async function QnaList({ item }: { item: IPost }) {
  const session = await auth();
  const typeLayout = session?.user?.type === 'seller' ? 'mr-auto' : 'ml-auto';
  console.log('typeLayout=======>', typeLayout);

  return (
    <div className="px-5 mb-1">
      <Link href={`/mypage/tutee/qna/${item._id}`}>
        <div className="p-5 rounded-lg border border-gray-30 flex items-center gap-5 ">
          {item.repliesCount > 0 ? (
            <span className="p-2 bg-blue-400 rounded-lg text-white text-sm">
              답변 완료
            </span>
          ) : (
            <span className="p-2 bg-orange-400 rounded-lg text-white text-sm">
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
