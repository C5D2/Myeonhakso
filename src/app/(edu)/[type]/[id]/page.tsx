import Button from '@/components/Button';
import Card from '@/components/Card';
import KakaoMap from '@/components/KakaoMap';

// TODO: 강의 소개, 강의 일정, 화상강의, 대면강의, 커리큘럼, 선생님의 다른 강의, 많이 듣는 토픽(카드)
function DetailPage() {
  return (
    <div>
      <div className="h-[640px] bg-gradient-to-r from-bg-light-green to-white ">
        <div className="mx-[170px] my-[100px] md:mx-[30px] md:my-[20px] pt-28 mt-auto mb-12">
          <div className="flex gap-5">
            <div className="rounded-lg bg-gray-10 h-[300px] px-20 py-10 box-border flex flex-col justify-evenly">
              <h2 className="text-2xl font-extrabold">강의 이름</h2>
              <p>
                강의 소개 강의 소개 강의 소개 강의 소개 강의 소개 강의 소개 강의
                소개 강의 소개 강의 소개 강의 소개 강의 소개 강의 소개 강의 소개
                강의 소개 강의 소개 강의 소개 강의 소개 강의 소개 강의 소개 강의
                소개 강의 소개
              </p>
              <div className="flex gap-3">
                <img src="/heart.svg" alt="찜" />
                <img src="/share.svg" alt="공유하기" />
              </div>
            </div>
            <div className="rounded-lg bg-gray-10 w-[410px] h-[300px] px-10 py-10 box-border flex flex-col justify-evenly">
              <h2 className="text-2xl font-extrabold">48000원</h2>
              <p>수강 옵션을 선택해주세요.</p>
              <select name="" id="">
                월, 목
              </select>
              <Button>수강 신청</Button>
            </div>
          </div>

          <div className="rounded-lg bg-gray-10 h-[170px] mt-[50px] px-20 py-10 border-box flex place-content-evenly items-center">
            <div>
              <p>레슨 수</p>
              <p>71개</p>
            </div>
            <div>
              <p>난이도</p>
              <p>중급</p>
            </div>
            <div>
              <p>수강 일정</p>
              <p>24.08.01~ 24.08.30</p>
            </div>
            <div>
              <p>카테고리</p>
              <p>데이터분석</p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-10 h-[170px] mt-[50px] px-8 py-10 border-box flex place-content-evenly gap-3">
            <img src="/teacher_detail.svg" alt="" />
            <div>
              <h2>오하요 선생님</h2>
              <p>
                선생님을 소개합니다 블라블라라라라라라라 선생님을 소개합니다
                블라라라라라라라라라블~
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
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
                <p>2024.07.01-2024.07.31</p>
              </div>

              <div className="flex gap-4">
                <img src="/time.svg" width="50px" alt="시간" />
                <div>
                  <p>월, 수, 금 16:00~18:00</p>
                  <p>화, 목 16:00~18:00</p>
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
              <KakaoMap address="서울 중구 퇴계로 324 (광희동2가, 성우빌딩)" />
              <p>서울 중구 광희동</p>
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
