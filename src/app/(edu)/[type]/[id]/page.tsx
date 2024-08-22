import DetailButton from '@/app/(edu)/[type]/[id]/DetailButton';
import { getSession } from '@/auth';
import Card from '@/components/Card';
import KakaoMap from '@/components/KakaoMap';
import {
  fetchBookmark,
  fetchLectureDetail,
  fetchOtherLectures,
} from '@/data/fetchLecture';
import { IBookmark } from '@/types/lecture';
import Image from 'next/image';
import Tab from './Tab';
import BookmarkLecture from '@/components/BookmarkLecture';
import SubscribeButton from '@/app/(edu)/[type]/[id]/SubscribeButton';
import { calculateDays } from '@/utils/calculateDays';
import { ShareButton } from '@/app/(edu)/[type]/[id]/ShareButton';

async function DetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user = session?.user;
  const item = await fetchLectureDetail(params.id);
  const seller_id = item?.seller._id;
  const type = item?.extra.type;
  const data = await fetchOtherLectures(String(seller_id!), '3');
  // 날짜 계산
  const daysDifference = calculateDays(item?.extra?.schedule);

  let isBookmarked = false;
  let bookmarkId: number | null = null;
  let isSubscribed = false;
  let subscribeId: string | null = null;

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
  }
  console.log(subscribeId);

  // TODO: 지금 강의는 다른 강의에서 빼야됨,,,
  // 공유하기도 하기
  const list = data?.map((item, index) => (
    <div
      className="max-w-[300px] h-[320px] rounded-xl flex flex-grow justify-between"
      key={index}
    >
      <Card key={index} item={item} />
    </div>
  ));

  // TODO: 난이도마다 레벨 svg 따로~
  return (
    <div className="h-1/2 bg-light-green">
      {/* <div className="h-[640px]"> */}
      <div>
        <div
          // className="mx-[170px] my-[100px] md:mx-[30px] md:my-[20px] pt-28 mt-auto mb-12"
          className="max-w-[1500px] mx-auto px-10 w-full mt-20"
        >
          <div className="flex gap-5 w-full">
            <div className="rounded-3xl bg-gray-10 h-[300px] px-20 py-10 box-border flex flex-col border border-main-light-green/50 justify-evenly flex-grow">
              <p className="text-main-green font-black text-lg">
                {item?.extra.type}
              </p>
              <h2 className="text-3xl font-bold">{item?.name}</h2>
              <p>{item?.content}</p>
              <div className="flex gap-3">
                <BookmarkLecture
                  params={params}
                  initialIsBookmarked={isBookmarked}
                  bookmarkId={bookmarkId}
                  type={type}
                />
                <ShareButton />
              </div>
            </div>
            <div className="rounded-3xl bg-gray-10 w-[400px] max-h-[300px] p-10 box-border border border-main-light-green/50 flex flex-col gap-5">
              {item?.quantity === item?.buyQuantity ? (
                <p>이미 구매한 강의입니다.</p>
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
                    user={{
                      name: user?.name ?? null,
                      email: user?.email ?? null,
                    }}
                    id={params.id}
                  />
                </>
              )}
            </div>
          </div>
          <div className="h-[170px] mt-[50px] flex place-content-evenly gap-5 items-center">
            <div className="rounded-3xl bg-gray-10 px-14 py-6 border border-main-light-green/50 flex items-center gap-3">
              <Image src="/lesson.svg" width={40} height={40} alt="레슨수" />
              <p className="text-lg">레슨 수</p>
              <p className="text-3xl font-black">
                {item?.extra.curriculum.length}개
              </p>
            </div>
            <div className="rounded-3xl bg-gray-10 px-14 py-6 border border-main-light-green/50 flex items-center gap-3">
              <Image src="/level-low.svg" width={30} height={40} alt="난이도" />
              <p className="text-lg">난이도</p>
              <p className="text-3xl font-black">{item?.extra.level}</p>
            </div>
            <div className="rounded-3xl bg-gray-10 px-14 py-6 border border-main-light-green/50 flex items-center gap-3">
              <Image src="/calendar.svg" width={40} height={40} alt="일정" />
              <div>
                <p className="text-lg">수강 일정</p>
                <p className="text-xl font-black">
                  {item?.extra?.schedule[0] ?? ''} -{' '}
                  {item?.extra?.schedule[1] ?? ''}
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-black">강사 소개</h2>
          <div className="rounded-3xl bg-gray-10 h-[170px] mt-[15px] px-8 py-10 border-box  border border-main-light-green/50 flex place-content-evenly items-center gap-3">
            {item?.seller.profileImage ? (
              <Image
                className="rounded-full"
                src={item?.seller.profileImage}
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
              <div className="flex justify-evenly items-center">
                <h2 className="text-2xl font-black mr-3">
                  {item?.seller.name}
                </h2>
                <Image src="/star.svg" width={20} height={20} alt="만족도" />
                <p className="inline">4.8</p>
              </div>
              <p>선생님 소개</p>
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
            <h2 className="text-2xl font-black">강의 일정</h2>
            <div className="mt-[15px] flex place-content-evenly items-center gap-3">
              <div className="rounded-3xl h-full w-full bg-gray-10 border border-main-light-green/50 flex flex-col items-center place-content-evenly">
                <h2 className="text-3xl font-black text-main-green">
                  {daysDifference}일
                </h2>
                <p>
                  {item?.extra?.schedule[0] ?? ''} -{' '}
                  {item?.extra?.schedule[1] ?? ''}
                </p>
              </div>

              {/* <div className="flex gap-4 items-center"> */}
              <div className="rounded-3xl h-full w-full p-3 bg-gray-10 border border-main-light-green/50 flex flex-col items-center place-content-evenly gap-3">
                <div className="flex gap-2">
                  {['월', '화', '수', '목', '금', '토', '일'].map(day => {
                    const isIncluded = item?.extra?.options.some(option =>
                      option.days.includes(day),
                    );
                    return (
                      <span
                        className={`${isIncluded ? 'bg-main-yellow' : 'bg-main-green'} text-white px-4 py-3 rounded-full`}
                        key={day}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-1">
                  {item?.extra?.options.map((option, index) => (
                    <div className="flex gap-1" key={index}>
                      <span className="bg-main-yellow p-3 rounded-full"></span>
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
          <div className="mt-[50px]">
            <h2 className="text-2xl font-black">화상 강의</h2>
            <div className="mt-5 place-content-center">
              <p className="text-2xl">
                화상강의 주소는 수강신청 완료 후 확인 가능합니다.
              </p>
              {/* <Image src="/right-arrow.svg" alt="화살표" /> */}
            </div>
          </div>
          <div className="mt-[50px]">
            <h2 className="text-2xl font-black">대면 강의</h2>
            <div className="rounded-3xl bg-gray-10 flex border border-main-light-green/50 mt-5 p-5">
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
            <h2 className="text-2xl font-black">강의 맛보기</h2>
            <div
              className="rounded-3xl bg-gray-10 w-full relative  order border-main-light-green/50 mt-5 overflow-hidden"
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
            <div className="flex flex-wrap content-start max-w-[1400px]">
              {list}
            </div>
          </div>
          <div className="mt-[50px]">
            <h3 className="font-bold mb-5">다른 수강생이 많이 듣는 토픽</h3>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default DetailPage;
