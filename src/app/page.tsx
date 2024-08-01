import SwiperCard from '@/components/SwiperCard';
import SwiperBanner from '../components/Swiper';

export default function RootPage() {
  // const swiper = new Swiper('.swiper', {
  //   modules: [Navigation, Pagination],
  // });
  return (
    <>
      <div className="grow-1 h-100">
        <SwiperBanner />
      </div>
      <div className="p-20">
        <h2>지금 인기있는 강의</h2>
        <SwiperCard />
        <h2>최근에 열린 강의</h2>
        <SwiperCard />
        <h2>인기 급상승 선생님</h2>
        <SwiperCard />
      </div>
    </>
  );
}
