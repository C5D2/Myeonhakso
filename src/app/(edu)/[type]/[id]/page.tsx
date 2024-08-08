import Button from '@/components/Button';
import Card from '@/components/Card';
import KakaoMap from '@/components/KakaoMap';
import { fetchLectureDetail } from '@/data/fetchLecture';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

function formatDate(date: any) {
  return format(parseISO(date), 'yyyy.MM.dd', { locale: ko });
}

function formatTime(date: any) {
  return format(parseISO(date), 'HH:mm', { locale: ko });
}

// TODO: 강의 소개, 강의 일정, 화상강의, 대면강의, 커리큘럼, 선생님의 다른 강의, 많이 듣는 토픽(카드)
async function DetailPage({ params }: { params: { id: string } }) {
  const item = await fetchLectureDetail(params.id);

  return (
    <div>
      <div className="h-[640px] bg-gradient-to-r from-bg-light-green to-white ">
        <div className="mx-[170px] my-[100px] md:mx-[30px] md:my-[20px] pt-28 mt-auto mb-12">
          <div className="flex gap-5">
            <div className="rounded-lg bg-gray-10 h-[300px] px-20 py-10 box-border flex flex-col justify-evenly">
              <h2 className="text-2xl font-extrabold">{item?.name}</h2>
              <p>{item?.content}</p>
              <div className="flex gap-3">
                <img src="/heart.svg" alt="찜" />
                <img src="/share.svg" alt="공유하기" />
              </div>
            </div>
            <div className="rounded-lg bg-gray-10 w-[410px] h-[300px] px-10 py-10 box-border flex flex-col justify-evenly">
              <h2 className="text-2xl font-extrabold">{item?.price}원</h2>
              <p>수강 옵션을 선택해주세요.</p>
              <select name="" id="">
                {item?.extra?.options.map((option, index) => (
                  <option key={index} value={index}>
                    {option.days.join(', ')} {formatTime(option.startTime)} ~{' '}
                    {formatTime(option.endTime)}
                  </option>
                ))}
              </select>
              <Button>수강 신청</Button>
            </div>
          </div>

          <div className="rounded-lg bg-gray-10 h-[170px] mt-[50px] px-20 py-10 border-box flex place-content-evenly items-center">
            <img src="/lesson.svg" alt="레슨수" />
            <div>
              <p>레슨 수</p>
              <p>{item?.extra.curriculum.length}개</p>
            </div>
            <img src="/level-low.svg" alt="난이도" />
            <div>
              <p>난이도</p>
              <p>{item?.extra.level}</p>
            </div>
            <img src="/calendar.svg" alt="일정" />
            <div>
              <p>수강 일정</p>
              <p>{item?.extra.level}</p>
            </div>
            <img src="/category.svg" alt="카테고리" />
            <div>
              <p>카테고리</p>
              <p>{item?.extra.type}</p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-10 h-[170px] mt-[50px] px-8 py-10 border-box flex place-content-evenly items-center gap-3">
            <img src="/teacher_detail.svg" width="80px" alt="선생님 사진" />
            <div>
              <h2>{item?.seller.name}</h2>
              <p>짱짱걸데스</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-evenly">
                <img src="/star.svg" alt="만족도" />
                <p className="inline">수강생 만족도 4.8</p>
              </div>
              <Button>선생님 구독하기</Button>
            </div>
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">강의 일정</h3>
            <div className="rounded-lg bg-gray-10 h-[170px] px-8 py-10 border-box flex place-content-evenly items-center">
              <div className="flex gap-4 items-center">
                <img src="/calendar.svg" width="50px" alt="일정" />
                <p>
                  {formatDate(item?.extra?.schedule[0])} -
                  {formatDate(item?.extra?.schedule[1])}
                </p>
              </div>

              {item?.extra?.options.map((option, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <img src="/time.svg" width="50px" alt="시간" />
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
            <div className="rounded-lg bg-gray-10 h-[600px]">
              강의 프리뷰 here
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="mt-[50px]">
              <h3 className="font-bold">커리큘럼</h3>
            </div>
            <div className="rounded-lg bg-gray-10 border-gray-30 h-[80px]"></div>
            <div className="rounded-lg bg-gray-10 border-gray-30 h-[80px]"></div>
            <div className="rounded-lg bg-gray-10 border-gray-30 h-[80px]"></div>
            <div className="rounded-lg bg-gray-10 border-gray-30 h-[80px]"></div>
            <div className="rounded-lg bg-gray-10 border-gray-30 h-[80px]"></div>
            <div className="rounded-lg bg-gray-10 border-gray-30 h-[80px]"></div>
            <img src="/triangle.svg" width="40px" alt="펼치기" />
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">오하요 선생님의 다른 강의</h3>
          </div>

          <div className="mt-[50px]">
            <h3 className="font-bold">다른 수강생이 많이 듣는 토픽</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
