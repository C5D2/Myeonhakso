import Card from '@/components/Card';
import { fetchLectureBookmark } from '@/data/fetchLecture';
import { ILectureBookmark } from '@/types/lecture';

async function Page() {
  const data = await fetchLectureBookmark();
  const items = data.item as ILectureBookmark[];

  //   <div className="grid grid-cols-4 flex-wrap gap-4 mx-5">
  //   {items?.map((item, index) => (
  //     <div
  //       className="max-w-[300px] h-[320px] rounded-xl flex-grow"
  //       key={index}
  //     >
  //       <Card key={index} item={item} />
  //     </div>
  //   ))}
  // </div>

  return (
    <>
      <div className="">
        <h2 className="font-extrabold text-[30px] mb-10">북마크</h2>
      </div>
      <div className="grid grid-cols-4 flex-wrap gap-4 mx-5">
        {items?.map((item, index) => (
          <div
            className="max-w-[300px] h-[320px] rounded-xl flex-grow"
            key={index}
          >
            <Card key={index} item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
