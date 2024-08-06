import SwiperCard from '@/components/SwiperCard';
import SwiperBanner from '../components/Swiper';

export default function RootPage() {
  // const swiper = new Swiper('.swiper', {
  //   modules: [Navigation, Pagination],
  // });
  return (
    <>
      <div className="grow-1 h-100 ">
        <SwiperBanner />
      </div>
      <div className="flex flex-col">
        <div className="mx-auto px-10 w-full max-w-screen-xxl">
          <h2 className="font-bold">지금 인기있는 강의</h2>
          <SwiperCard sortParam="popular" />
          <h2 className="font-bold">최근에 열린 강의</h2>
          <SwiperCard sortParam="recent" />
          <h2 className="font-bold">인기 급상승 선생님</h2>
          <SwiperCard sortParam="teacher" />
        </div>
      </div>
    </>
  );
}
