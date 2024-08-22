import { Ilecture } from '@/types/lecture';

export default function LectureRating({ item }: { item: Ilecture[] }) {
  let totalRating = 0;
  const ratingArray = item.filter(item => item.rating).map(item => item.rating);

  ratingArray.forEach(item => (totalRating += item));

  const rating = (totalRating / ratingArray.length).toFixed(1);
  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-[50px] text-gray-50">{rating} 점</p>
    </div>
  );
}
