import DetailButton from '@/app/(edu)/[type]/[id]/DetailButton';
import DetailCurriculum from '@/app/(edu)/[type]/[id]/DetailCurriculum';
import { getSession } from '@/auth';
import AddBookmarkLecture from '@/components/AddBookmarkLecture';
import Button from '@/components/Button';
import Card from '@/components/Card';
import DeleteBookmarkLecture from '@/components/DeleteBookmarkLecture';
import KakaoMap from '@/components/KakaoMap';
import {
  fetchLectureDetail,
  fetchOtherLectures,
  getLectureBookmark,
} from '@/data/fetchLecture';
import { ILectureBookmark } from '@/types/lecture';
import Image from 'next/image';

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
}

function formatTime(dateString: string) {
  const date = new Date(dateString);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

// 이미 구매한 강의는 구매 버튼을 disabled로
async function DetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user = session?.user;
  const item = await fetchLectureDetail(params.id);
  const seller_id = item?.seller._id;
  const data = await fetchOtherLectures(seller_id!, '3');

  let isBookmarked = false;
  let bookmarkId: number | null = null;

  if (user) {
    const data = await getLectureBookmark();
    const product = data.item;

    const bookmarkedItem = product.find((item: ILectureBookmark) => {
      return item.product && item.product._id === Number(params.id);
    });
    if (bookmarkedItem) {
      isBookmarked = true;
      bookmarkId = bookmarkedItem._id;
    }
  }
  console.log(bookmarkId);

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
      <div className="h-[640px]">
        <div className="h-5/6 bg-light-green">
          <div className="mx-[170px] my-[100px] md:mx-[30px] md:my-[20px] pt-28 mt-auto mb-12">
            <div className="flex gap-5 w-full">
              <div className="rounded-lg bg-gray-10 h-[300px] px-20 py-10 box-border flex flex-col justify-evenly flex-grow">
                <h2 className="text-2xl font-extrabold">{item?.name}</h2>
                <p>{item?.content}</p>
                <div className="flex gap-3">
                  {isBookmarked && bookmarkId !== null ? (
                    <DeleteBookmarkLecture bookmarkId={bookmarkId} />
                  ) : (
                    <AddBookmarkLecture params={params} />
                  )}
                  <Image
                    src="/share.svg"
                    width={30}
                    height={20}
                    alt="공유하기"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-gray-10 w-[400px] max-h-[300px] px-10 py-10 box-border flex flex-col justify-evenly">
                <h2 className="text-2xl font-extrabold">{item?.price}원</h2>
                {item?.quantity === item?.buyQuantity ? (
                  <p>이미 구매한 강의입니다.</p>
                ) : (
                  <>
                    <p>수강 옵션을 선택해주세요.</p>
                    <select name="" id="">
                      {item?.extra?.options.map((option, index) => (
                        <option key={index} value={index}>
                          {option.days.join(', ')}{' '}
                          {formatTime(option.startTime ?? '')} ~{' '}
                          {formatTime(option.endTime ?? '')}
                        </option>
                      ))}
                    </select>

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

            <div className="rounded-lg bg-gray-10 h-[170px] mt-[50px] px-20 py-10 border-box flex place-content-evenly items-center">
              <Image src="/lesson.svg" width={40} height={40} alt="레슨수" />
              <div>
                <p>레슨 수</p>
                <p>{item?.extra.curriculum.length}개</p>
              </div>
              <Image src="/level-low.svg" width={30} height={40} alt="난이도" />
              <div>
                <p>난이도</p>
                <p>{item?.extra.level}</p>
              </div>
              <Image src="/calendar.svg" width={40} height={40} alt="일정" />
              <div>
                {/* TODO: 수강 일정 서버 보내는 함수 수정 후 확인할 것 */}
                <p>수강 일정</p>
                <p>
                  {formatDate(item?.extra?.schedule[0] ?? '')} -{' '}
                  {formatDate(item?.extra?.schedule[1] ?? '')}
                </p>
              </div>
              <Image
                src="/category.svg"
                width={40}
                height={40}
                alt="카테고리"
              />
              <div>
                <p>카테고리</p>
                <p>{item?.extra.type}</p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-10 h-[170px] mt-[50px] px-8 py-10 border-box flex place-content-evenly items-center gap-3">
              <Image
                src="/teacher_detail.svg"
                width={80}
                height={80}
                alt="선생님 사진"
              />
              <div>
                <h2>{item?.seller.name}</h2>
                <p>짱짱걸데스</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-evenly">
                  <Image src="/star.svg" width={20} height={20} alt="만족도" />
                  <p className="inline">수강생 만족도 4.8</p>
                </div>
                <Button>선생님 구독하기</Button>
              </div>
            </div>

            <div className="mt-[50px]">
              <h3 className="font-bold">강의 일정</h3>
              <div className="rounded-lg bg-gray-10 h-[170px] px-8 py-10 border-box flex place-content-evenly items-center">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/calendar.svg"
                    width={40}
                    height={40}
                    alt="일정"
                  />
                  <p>
                    {formatDate(item?.extra?.schedule[0] ?? '')} -{' '}
                    {formatDate(item?.extra?.schedule[1] ?? '')}
                  </p>
                </div>

                <div className="flex gap-4 items-center">
                  <Image src="/time.svg" width={40} height={40} alt="시간" />
                  <div className="flex flex-col">
                    {item?.extra?.options.map((option, index) => (
                      <div key={index}>
                        <p>
                          {option.days.join(', ')}{' '}
                          {formatTime(option.startTime ?? '')} ~{' '}
                          {formatTime(option.endTime ?? '')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[50px]">
              <h3 className="font-bold">화상 강의</h3>
              <div className="rounded-lg bg-gray-10 h-[140px] place-content-center">
                <p>* 화상강의 주소는 수강신청 완료 후 확인 가능합니다.</p>
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
    </div>
  );
}

export default DetailPage;
