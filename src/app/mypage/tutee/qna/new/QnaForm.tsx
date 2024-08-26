'use client';

import { postQna } from '@/data/actions/mypageAction';
import { Ilecture } from '@/types/lecture';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Bounce, Slide, toast } from 'react-toastify';

export type IPostQna = {
  private: true;
  type: 'qna';
  title: string;
  content: string;
  share: number[];
};

export default function QnaForm({
  product,
  prodId,
}: {
  product: Ilecture[];
  prodId: number | undefined;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IPostQna>();
  const router = useRouter();

  const handleQna = async (formData: any) => {
    formData.type = 'qna';
    formData.private = true;
    formData.share = [Number(formData.share)];

    const resData = await postQna(formData);
    if (resData.ok) {
      toast('문의글 등록이 완료되었습니다.', {
        position: 'top-center',
        transition: Bounce,
      });
      router.push('/mypage/tutee/qna');
    }
    return resData;
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-lg border-b border-gray-30 py-1 mb-5">
        질의 응답 등록
      </h3>
      <form
        onSubmit={handleSubmit(handleQna)}
        className="sm:w-full flex flex-col w-[70%] px-5 mx-auto"
      >
        <label className="font-semibold mr-3">강의 선택</label>
        <select
          className="w-[200px] mb-3 border border-gray-30 px-2 py-1 rounded-lg"
          defaultValue={prodId ? prodId.toString() : ''}
          {...register('share')}
        >
          {product.map((item, index) => (
            <option key={index} id="lecture" value={item.seller_id}>
              {item.name}
            </option>
          ))}
        </select>
        <p className="font-semibold ">질문 제목</p>
        <input
          type="text"
          {...register('title', {
            required: '제목을 입력하세요.',
            minLength: {
              value: 2,
              message: '제목은 2글자 이상 입력하주세요.',
            },
          })}
          className="mb-3 outline-gray-50 px-2 py-1 rounded-lg border border-gray-30"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        <p className="font-semibold">질문 내용</p>

        <textarea
          {...register('content', {
            required: '내용을 입력하세요.',
            minLength: {
              value: 2,
              message: '내용은 2글자 이상 입력하주세요.',
            },
          })}
          className="h-[150px] mb-10 w-full resize-none outline-gray-50 border border-gray-30 px-2 py-1 rounded-lg"
        />

        <button
          type="submit"
          className="bg-main-light-green hover:text-white hover:bg-main-green mx-auto rounded-lg w-[100px] px-3 py-2"
        >
          등록
        </button>
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </form>
    </div>
  );
}
