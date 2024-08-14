'use client';

import Bookmark from '@/components/Bookmark';
import { postLectureBookmark } from '@/data/actions/lectureAction';

export default function AddBookmarkLecture({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => postLectureBookmark(params.id)}
    >
      <Bookmark width={40} height={40} fill={'gray'} stroke={'current'} />
    </div>
  );
}
