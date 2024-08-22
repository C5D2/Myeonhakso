import SwiperCard from '@/components/SwiperCard';
import SwiperBanner from '../components/Swiper';
import Search from '@/components/Search';

export default function RootPage() {
  return (
    <>
      <div className="">
        <SwiperBanner />
      </div>
      <div className="mt-10 mx-auto max-w-[650px] w-full">
        <Search />
      </div>
      <div className="max-w-[1500px] mx-auto px-10 w-full mt-10">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-lg">지금 인기있는 강의</h2>
          <img src="/popular.svg" className="w-6 h-6" />
        </div>

        <SwiperCard sortParam="bookmarks" />

        <div className="flex items-center gap-2">
          <h2 className="font-bold">최근에 열린 강의</h2>
          <img src="/recent.svg" className="w-6 h-6" />
        </div>
        <SwiperCard sortParam="createdAt" />

        <div className="flex items-center gap-2">
          <h2 className="font-bold">인기 급상승 선생님</h2>
          <img src="/teacher.svg" className="w-6 h-6" />
        </div>
        <SwiperCard sortParam="buyQuantity" />
      </div>
    </>
  );
}
