interface IBookmarkedUser {
  user_id: string;
  name: string;
}

interface ILectureInfo {
  id: number;
  name: string;
  type: string;
}

export function newLectureNotification(
  bookmarkedUsers: IBookmarkedUser[],
  lectureInfo: ILectureInfo,
  seller: string | undefined,
) {
  return bookmarkedUsers.map(bookmarkData => ({
    target_id: bookmarkData.user_id,
    content: `${bookmarkData.name}님, ${seller}님의 새로운 강의 "${lectureInfo.name}"이/가 등록되었습니다.`,
    extra: {
      lecture_id: lectureInfo.id,
      url: `${lectureInfo.type}/${lectureInfo.id}`,
    },
  }));
}
