import { Ilecture } from '@/types/lecture';

function StudentCount({ item }: { item: Ilecture[] }) {
  let totalStudents = 0;
  const ratingArray = item
    .filter(item => item.buyQuantity !== 0)
    .map(item => item.buyQuantity);

  ratingArray.forEach(item => (totalStudents += item));

  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-[50px] text-gray-50 sm:text-[20px]">
        {totalStudents} 명
      </p>
    </div>
  );
}

export default StudentCount;
