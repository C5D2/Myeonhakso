import DetailButton from '@/app/(with-chatbot)/(edu)/[type]/[id]/DetailButton';
import { getSession } from '@/auth';
import Card from '@/components/Card';
import KakaoMap from '@/components/KakaoMap';
import {
  fetchBookmark,
  fetchLecture,
  fetchLectureDetail,
  fetchOtherLectures,
} from '@/data/fetchLecture';
import { IBookmark } from '@/types/lecture';
import Image from 'next/image';
import BookmarkLecture from '@/components/BookmarkLecture';
import SubscribeButton from '@/app/(with-chatbot)/(edu)/[type]/[id]/SubscribeButton';
import { calculateDays } from '@/utils/calculateDays';
import { ShareButton } from '@/app/(with-chatbot)/(edu)/[type]/[id]/ShareButton';
import moment from 'moment';
import LectureLevel, { ILevelType } from '@/components/LectureLevel';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchOrderProduct } from '@/data/fetchMypage';
import Tab from '@/app/(with-chatbot)/(edu)/[type]/[id]/Tab';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function generateMetadata({
  params,
}: {
  params: { type: string; id: string };
}): Promise<Metadata> {
  const lectureType = params.type;
  const item = await fetchLectureDetail(params.id);
  if (item === null) notFound();
  return {
    title: `${lectureType} - ${item.name}`,
    description: `${lectureType} - ${item.content}`,
    openGraph: {
      title: `${lectureType} - ${item.name}`,
      description: `${lectureType} - ${item.content}`,
      url: `/${params.type}/${params.id}`,
    },
  };
}

async function DetailPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const session = await getSession();
  const user = session?.user;
  const item = await fetchLectureDetail(params.id);
  const seller_id = item?.seller._id;
  const type = item?.extra.type;
  const otherData = await fetchOtherLectures(String(seller_id!), '4');
  const popularData = await fetchLecture(
    'products',
    { bookmarks: -1 },
    String(4),
  );

  // 일자 경과
  const currentDate = new Date();
  const scheduleEndDate = item?.extra?.schedule[1]
    ? new Date(item.extra.schedule[1])
    : null;
  const isClosed = scheduleEndDate ? currentDate > scheduleEndDate : false;

  // 날짜 계산
  const daysDifference = calculateDays(item?.extra?.schedule);

  let isBookmarked = false;
  let bookmarkId: number | null = null;
  let isSubscribed = false;
  let subscribeId: string | null = null;
  let isOrdered = false;

  if (user) {
    // 강의 북마크 데이터
    const data = await fetchBookmark();
    const product = data.item;

    const bookmarkedItem = product.find((item: IBookmark) => {
      return item.product && item.product._id === Number(params.id);
    });
    if (bookmarkedItem) {
      isBookmarked = true;
      bookmarkId = bookmarkedItem._id;
    }

    // 선생님 북마크 데이터
    const teacherData = await fetchBookmark('user');
    const user = teacherData.item;

    const bookmarkedTeacher = user.find((item: IBookmark) => {
      return item.user && item.user._id === Number(seller_id);
    });
    if (bookmarkedTeacher) {
      isSubscribed = true;
      subscribeId = bookmarkedTeacher._id;
    }

    // 주문한 목록
    const orderedData = await fetchOrderProduct();
    const orderedList = orderedData.item;

    const orderedItem = orderedList.find(item =>
      item.products.some(product => product._id === Number(params.id)),
    );

    if (orderedItem) {
      isOrdered = true;
    }
  }

  // TODO: 지금 강의는 다른 강의에서 빼야됨,,,
  // TODO: overflow: hidden
  const otherLectureList = otherData?.map((item, index) => (
    <div
      className="max-w-[300px] h-[320px] rounded-xl flex flex-grow justify-between"
      key={index}
    >
      <Card key={index} item={item} />
    </div>
  ));

  const popularLectureList = popularData?.map((item, index) => (
    <div
      className="max-w-[300px] h-[320px] rounded-xl flex flex-grow justify-between"
      key={index}
    >
      <Card key={index} item={item} />
    </div>
  ));

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-light-green z-0" />

      <div className="relative z-10 pt-20">
        <div className="max-w-[1500px] min-w-[380px] mx-auto px-10 w-full">
          <div className="-mt-20">
            <div className="pt-20">
              <div className="flex gap-5 w-full md:flex-col">
                <div className="rounded-3xl bg-gray-10 px-20 py-8 md:px-10 md:py-8 gap-2 box-border flex flex-col border border-main-light-green/50 justify-evenly flex-grow">
                  <p className="text-main-green font-black text-lg">
                    {item?.extra.type}
                  </p>
                  <h2 className="text-3xl font-bold sm:text-xl">
                    {item?.name}
                  </h2>
                  <p className="sm:text-md">{item?.content}</p>
                  <div className="flex gap-3">
                    <BookmarkLecture
                      params={params}
                      initialIsBookmarked={isBookmarked}
                      bookmarkId={bookmarkId}
                      type={type}
                    />
                    <div className="flex items-center">
                      <ShareButton />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-gray-10 max-h-[300px] min-w-[300px] xxl:min-w-[450px] p-10 box-border border border-main-light-green/50 flex flex-col justify-center gap-5">
                  {isOrdered ? (
                    <div className="flex place-content-center">
                      <p className="font-black text-gray-800 text-3xl">
                        이미 구매한 강의입니다.
                      </p>
                    </div>
                  ) : isClosed || item?.quantity == item?.buyQuantity ? (
                    <div className="flex place-content-center">
                      <p className="font-black text-gray-800 text-3xl">
                        마감된 강의입니다.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="font-extrabold">수강 옵션을 선택해주세요</p>
                      <select name="" id="">
                        {(item?.extra?.options ?? []).map((option, index) => (
                          <option key={index} value={index}>
                            {(option.days ?? []).join(', ')}{' '}
                            {option.startTime ?? ''} ~ {option.endTime ?? ''}
                          </option>
                        ))}
                      </select>

                      <h2 className="text-2xl font-black flex justify-end mb-auto">
                        {item?.price
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </h2>

                      <DetailButton
                        params={params}
                        item={item}
                        userInfo={{
                          name: user?.name ?? null,
                          email: user?.email ?? null,
                        }}
                        id={params.id}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="mt-[50px] flex gap-5 md:flex-col">
                <div className="flex-1 rounded-3xl bg-gray-10 px-8 py-6 border border-main-light-green/50 flex items-center justify-between">
                  <div className="flex items-center gap-10">
                    <Image
                      src="/lesson.svg"
                      width={40}
                      height={40}
                      alt="레슨수"
                    />
                    <div>
                      <p className="text-lg sm:text-sm">레슨 수</p>
                      <p className="text-3xl font-black sm:text-sm">
                        {item?.extra.curriculum.length}개
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 rounded-3xl bg-gray-10 px-8 py-6 border border-main-light-green/50 flex items-center justify-between">
                  <div className="flex items-center gap-10">
                    <LectureLevel level={item?.extra.level as ILevelType} />
                    <div>
                      <p className="text-lg sm:text-sm">난이도</p>
                      <p className="text-3xl font-black sm:text-sm">
                        {item?.extra.level}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 rounded-3xl bg-gray-10 px-8 py-6 border border-main-light-green/50 flex items-center justify-between">
                  <div className="flex items-center gap-10">
                    <Image
                      src="/calendar.svg"
                      width={50}
                      height={50}
                      alt="일정"
                    />
                    <div>
                      <p className="text-lg sm:text-sm">수강 일정</p>
                      <p className="text-xl font-black sm:text-sm">
                        {moment(item?.extra?.schedule[0]).format(
                          'YYYY-MM-DD',
                        ) ?? ''}{' '}
                        ~{' '}
                        {moment(item?.extra?.schedule[1]).format(
                          'YYYY-MM-DD',
                        ) ?? ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl mt-[50px] font-black">강사 소개</h2>
              <div className="rounded-3xl bg-gray-10 mt-[15px] px-8 py-10 border-box border border-main-light-green/50 flex md:flex-col place-content-evenly items-center gap-3">
                <div className="flex place-items-center gap-5">
                  {item?.seller?.image ? (
                    <Image
                      className="rounded-full"
                      src={`${SERVER}/${item?.seller?.image}`}
                      width={80}
                      height={80}
                      alt="선생님 사진"
                    />
                  ) : (
                    <Image
                      src="/teacher_detail.svg"
                      width={80}
                      height={80}
                      alt="선생님 사진"
                    />
                  )}

                  <div>
                    <div className="flex flex-col justify-evenly items-center gap-3">
                      <h2 className="text-2xl font-black mr-3">
                        {item?.seller.name}
                      </h2>
                      <p>{item?.seller.address}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <SubscribeButton
                    initialIsSubscribed={isSubscribed}
                    teacherId={String(seller_id)}
                    subscribeId={subscribeId}
                  />
                </div>
              </div>

              <div className="mt-[50px]">
                <h2 className="text-2xl font-black mb-4">강의 일정</h2>
                <div className="flex gap-4 md:flex-col">
                  <div className="rounded-3xl w-full bg-gray-10 border border-main-light-green/50 flex flex-col gap-3 items-center justify-center py-6">
                    <h2 className="text-3xl font-black text-main-green">
                      {daysDifference}일
                    </h2>
                    <p>
                      {moment(item?.extra?.schedule[0]).format('YYYY-MM-DD') ??
                        ''}{' '}
                      ~{' '}
                      {moment(item?.extra?.schedule[1]).format('YYYY-MM-DD') ??
                        ''}
                    </p>
                  </div>

                  <div className="rounded-3xl w-full p-6 bg-gray-10 border border-main-light-green/50">
                    <div className="flex justify-center mb-4 gap-5 md:gap-2">
                      {['월', '화', '수', '목', '금', '토', '일'].map(day => {
                        const isIncluded = item?.extra?.options.some(option =>
                          option.days.includes(day),
                        );
                        return (
                          <span
                            className={`${
                              isIncluded ? 'bg-main-yellow' : 'bg-main-green'
                            } text-white px-4 py-3 rounded-full w-12 h-12 flex items-center justify-center md:px-2`}
                            key={day}
                          >
                            {day}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex flex-col gap-2">
                      {item?.extra?.options.map((option, index) => (
                        <div
                          className="flex items-center justify-center gap-2"
                          key={index}
                        >
                          <span className="bg-main-yellow w-4 h-4 rounded-full"></span>
                          <p>
                            {option.days.join(', ')} {option.startTime ?? ''} ~{' '}
                            {option.endTime ?? ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {item?.extra?.address === '' ? (
                <div className="mt-[50px]">
                  <h2 className="text-2xl font-black">화상 강의</h2>
                  <div className="mt-5 place-content-center">
                    <p className="text-2xl">
                      화상강의 주소는 수강신청 완료 후 확인 가능합니다.
                    </p>
                    {/* <Image src="/right-arrow.svg" alt="화살표" /> */}
                  </div>
                </div>
              ) : (
                <div className="mt-[50px]">
                  <h2 className="text-2xl font-black">대면 강의</h2>
                  <div className="rounded-3xl bg-gray-10 border border-main-light-green/50 mt-5">
                    <KakaoMap address={item?.extra?.address!} />
                    <p className="p-3">{item?.extra.address}</p>
                  </div>
                </div>
              )}
              <div className="mt-[50px]">
                <h2 className="text-2xl font-black">강의 맛보기</h2>
                <div
                  className="rounded-3xl bg-gray-10 w-full relative border border-main-light-green/50 mt-5 overflow-hidden"
                  style={{ paddingTop: '56.25%' }}
                >
                  <iframe
                    src={item?.extra.preview}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                  />
                </div>
              </div>
              <div className="mt-[50px] flex flex-col gap-3">
                <Tab item={item} />
              </div>
              <div className="mt-[50px]">
                <h3 className="font-bold mb-5">
                  {item?.seller.name} 선생님의 다른 강의
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-2 content-start">
                  {otherLectureList}
                </div>
              </div>
              <div className="mt-[50px]">
                <h3 className="font-bold mb-5">인기 있는 토픽</h3>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-2 content-start mb-[50px]">
                {popularLectureList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
