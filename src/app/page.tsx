import SwiperCard from '@/components/SwiperCard';
import SwiperBanner from '../components/Swiper';

export default function RootPage() {
  return (
    <>
      <div className="grow-1 h-100">
        <SwiperBanner />
      </div>
      <div className="max-w-[1500px] mx-auto px-10 w-full mt-10">
        <h2 className="font-bold">지금 인기있는 강의</h2>
        <SwiperCard sortParam="bookmarks" />
        <h2 className="font-bold">최근에 열린 강의</h2>
        <SwiperCard sortParam="createdAt" />
        <h2 className="font-bold">인기 급상승 선생님</h2>
        <SwiperCard sortParam="buyQuantity" />
      </div>
    </>
  );
}
