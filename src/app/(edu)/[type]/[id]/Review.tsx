'use client';

import { fetchReview } from '@/data/fetchLecture';
import { ILectureReview } from '@/types/lecture';
import { ReactNode } from 'react';
import useSWR from 'swr';

interface IPropId {
  id: number;
}

function Review({ id }: IPropId) {
  let reviewCount = 0;
  // let list: ReactNode[];
  const getReviews = async (id: number) => {
    const resData = await fetchReview(id);
    return resData;
  };

  const { data, error, isLoading } = useSWR<ILectureReview[] | null>([id], () =>
    getReviews(id),
  );

  if (data) {
    data?.forEach(item => {
      reviewCount += item?.rating;
    });
  }

  const list: ReactNode[] | undefined = data?.map((item, index) => (
    <div
      key={index}
      className="border border-gray-30 rounded-md p-10 w-[80%] mb-2"
    >
      <div className="flex gap-5">
        <p>{item.user.name}</p>
        <p className="text-gray-50">{item.createdAt}</p>
      </div>
      <div className="flex gap-3 items-center my-2">
        <div className="flex w-fit h-5">
          {Array.from({ length: 5 }, (_, index) => (
            <img
              key={index}
              src={index < item.rating ? '/filled-star.svg' : '/empty-star.svg'}
            />
          ))}
        </div>
        <p className="text-gray-50">{item.rating}</p>
      </div>
      {/* <div className="flex justify-center w-5 h-5 border border-black">
        <img src="/filled-star.svg" alt="" />
        <img src="/filled-star.svg" alt="" />
        <img src="/filled-star.svg" alt="" />
        <img src="/filled-star.svg" alt="" />
        <img src="/empty-star.svg" alt="" />
      </div> */}
      <p>{item.content}</p>
    </div>
  ));

  return (
    <>
      {list?.length !== 0 && (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 flex justify-center gap-2">
            <img src="/filled-star.svg" />
            <p className="font-extrabold text-[50px]">
              {list?.length && (reviewCount / list?.length).toFixed(1)}
            </p>
          </div>

          {/* <div className="flex justify-center w-8 h-8">
            {Array.from({ length: 5 }, (_, index) => (
              <img
                key={index}
                src={
                  index < reviewCount / list?.length
                    ? '/filled-star.svg'
                    : '/empty-star.svg'
                }
              />
            ))}
          </div> */}
          <p className="mb-5 text-gray-50">총 {list?.length}개</p>
          {list}
        </div>
      )}

      {list?.length === 0 && <p>아직 리뷰가 없어요</p>}
    </>
  );
}

export default Review;
