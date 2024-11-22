import { Ilecture } from "@/types/lecture";
import Link from "next/link";

interface IMiniCardProp {
item: Ilecture;
}
export default function MiniCard({ item }: IMiniCardProp) {
  return (
    <Link
    href={`/${item?.extra?.type}/${item?._id}`}>
      <div className="w-full flex-1 bg-white border border-gray-200 rounded-lg p-4 mb-4 h-[150px] hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold mb-2 px-2 truncate whitespace-normal line-clamp-1">
        {item?.name || '제목 없음'}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="px-2 py-1 box-border bg-light-orange rounded">
          {item?.extra?.level || '레벨 미정'}
          </span>
        </div>
        <p className="px-2 text-sm text-gray-700 whitespace-normal line-clamp-2">
        {item?.extra?.curriculum?.[0]?.content || '내용 없음'}
        </p>
      </div>
    </Link>
  )
}