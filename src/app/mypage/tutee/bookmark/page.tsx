import Tab from '@/app/mypage/tutee/bookmark/Tab';
import { fetchBookmark } from '@/data/fetchLecture';
import { IBookmark } from '@/types/lecture';

async function Page() {
  const lectureData = await fetchBookmark();
  const teacherData = await fetchBookmark('user');
  const lectureItems = lectureData.item as IBookmark[];
  const teacherItems = teacherData.item as IBookmark[];

  return (
    <>
      <div className="">
        <h2 className="font-extrabold text-[30px] mb-3">북마크</h2>
      </div>
      <div className="mb-2">
        <Tab lectureItems={lectureItems} teacherItems={teacherItems} />
      </div>
    </>
  );
}

export default Page;
