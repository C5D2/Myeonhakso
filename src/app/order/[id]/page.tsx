'use server';

import DetailCurriculum from '@/app/(edu)/[type]/[id]/DetailCurriculum';
import BookmarkLecture from '@/components/BookmarkLecture';
import Button from '@/components/Button';
import Card from '@/components/Card';
import KakaoMap from '@/components/KakaoMap';
import { fetchLectureDetail, fetchOtherLectures } from '@/data/fetchLecture';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

function formatDate(date: any) {
  return format(parseISO(date), 'yyyy.MM.dd', { locale: ko });
}

function formatTime(date: any) {
  return format(parseISO(date), 'HH:mm', { locale: ko });
}

async function OrderDetailPage({ params }: { params: { id: string } }) {
  const item = await fetchLectureDetail(params.id);
  // const session = await getSession();
  // const user = session?.user;
  const seller_id = item?.seller._id;
  const data = await fetchOtherLectures(String(seller_id!), '3');

  let isBookmarked = false;
  let bookmarkId: number | null = null;

  // if (user) {
  //   // 강의 북마크 데이터
  //   const data = await fetchLectureBookmark();
  //   const product = data.item;

  //   const bookmarkedItem = product.find((item: IBookmark) => {
  //     return item.product && item.product._id === Number(params.id);
  //   });
  //   if (bookmarkedItem) {
  //     isBookmarked = true;
  //     bookmarkId = bookmarkedItem._id;
  //   }
  // }

  // 지금 강의는 다른 강의에서 빼야됨,,,
  // 목록(type) 카드 사이즈 맞추기
  const list = data?.map((item, index) => (
    <div
      className="max-w-[300px] h-[320px] rounded-xl flex flex-grow justify-between"
      key={index}
    >
      <Card key={index} item={item} />
    </div>
  ));

  return (
    <div>
      <div className="h-[640px] bg-gradient-to-r from-bg-light-green to-white ">
        <div className="mx-[170px] my-[100px] md:mx-[30px] md:my-[20px] pt-28 mt-auto mb-12">
          <div className="flex gap-5 w-full">
            <div className="rounded-lg bg-gray-10 h-[300px] px-20 py-10 box-border flex flex-col justify-evenly flex-grow">
              <h2 className="text-2xl font-extrabold">{item?.name}</h2>
              <p>{item?.content}</p>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <BookmarkLecture
                    params={params}
                    initialIsBookmarked={isBookmarked}
                    bookmarkId={bookmarkId}
                  />
                  <Image
                    src="/share.svg"
                    width={30}
                    height={20}
                    alt="공유하기"
                  />
                </div>
                <Button>1:1 문의하기</Button>
              </div>
            </div>
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">강의 일정</h3>
            <div className="rounded-lg bg-gray-10 h-[170px] px-8 py-10 border-box flex place-content-evenly items-center">
              <div className="flex gap-4 items-center">
                <Image src="/calendar.svg" width={40} height={40} alt="일정" />
                <p>
                  {formatDate(item?.extra?.schedule[0])} -
                  {formatDate(item?.extra?.schedule[1])}
                </p>
              </div>

              {item?.extra?.options.map((option, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <Image src="/time.svg" width={40} height={40} alt="시간" />
                  <div>
                    <p>
                      {option.days.join(', ')} {formatTime(option.startTime)} ~{' '}
                      {formatTime(option.endTime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">화상 강의</h3>
            <div className="rounded-lg bg-gray-10 h-[140px] flex place-content-center items-center gap-5">
              <Image src="/video.svg" width={30} height={30} alt="화상강의" />
              {item?.extra.url ? (
                <p className="place-content-center">{item?.extra?.url}</p>
              ) : (
                <p>대면으로 진행되는 강의입니다.</p>
              )}
            </div>
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">대면 강의</h3>
            <div className="rounded-lg bg-gray-10 pb-5">
              {item?.extra?.address === '' ? (
                <p>화상으로 진행되는 강의입니다.</p>
              ) : (
                <>
                  <KakaoMap address={item?.extra?.address!} />
                  <p>{item?.extra.address}</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">강의를 미리 들어보세요</h3>
            <div
              className="rounded-lg bg-gray-10 w-full relative overflow-hidden"
              style={{ paddingTop: '56.25%' }}
            >
              <iframe
                src={item?.extra.preview}
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <DetailCurriculum item={item} />
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">오하요 선생님의 다른 강의</h3>
            <div className="flex flex-wrap content-start max-w-[1400px]">
              {list}
            </div>
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">다른 수강생이 많이 듣는 토픽</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
