'use client';
import { Ilecture } from '@/types/lecture';
import { useForm } from 'react-hook-form';

interface IQnaRegisterForm {
  lecture: number;
  title: string;
  content: string;
}

export default function QnaForm({ product }: { product: Ilecture[] }) {
  const { register, formState, handleSubmit } = useForm<IQnaRegisterForm>();

  const handleQna = async (formData: any) => {
    formData.type = 'qna';
    formData.pricate = true;
    // const resData
    console.log('formData', formData);

    // if (!resData.ok) {
    //   throw new Error('질문을 등록할 수 없습니다.');
    // }
  };

  return (
    <form onSubmit={handleSubmit(handleQna)}>
      <label>강의 선택</label>
      <select>
        {product.map((item, index) => (
          <option
            key={index}
            id="lecture"
            value={item._id}
            {...register('lecture')}
          >
            {item.name}
          </option>
        ))}
      </select>
      <p>질문 제목</p>
      <input type="text" {...register('title')}></input>
      <p>질문 내용</p>

      <textarea {...register('content')} />
      <button type="submit" className="border border-black">
        전송
      </button>
    </form>
  );
}
