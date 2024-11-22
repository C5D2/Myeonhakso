import SwiperCard from '@/components/SwiperCard';
import SwiperBanner from '../../components/Swiper';
import Search from '@/components/Search';
import Image from 'next/image';

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
          <Image
            src="/popular.svg"
            width={24}
            height={24}
            alt="인기있는 강의 아이콘"
          />
        </div>

        <SwiperCard sortParam="bookmarks" />

        <div className="flex items-center gap-2">
          <h2 className="font-bold">최근에 열린 강의</h2>
          <Image
            src="/recent.svg"
            width={24}
            height={24}
            alt="최근에 열린 강의 아이콘"
          />
        </div>
        <SwiperCard sortParam="createdAt" />

        <div className="flex items-center gap-2">
          <h2 className="font-bold">면학소 신규 선생님</h2>
          <Image
            src="/teacher.svg"
            width={24}
            height={24}
            alt="신규 선생님 아이콘"
          />
        </div>
        <SwiperCard sortParam="teacher" />
      </div>
    </>
  );
}