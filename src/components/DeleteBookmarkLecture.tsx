'use client';

import Bookmark from '@/components/Bookmark';
import { deleteLectureBookmark } from '@/data/actions/lectureAction';

export default function DeleteBookmarkLecture({
  bookmarkId,
}: {
  bookmarkId: number;
}) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => deleteLectureBookmark(String(bookmarkId))}
    >
      <Bookmark width={40} height={40} fill={'#FAC56C'} stroke={'current'} />
    </div>
  );
}
