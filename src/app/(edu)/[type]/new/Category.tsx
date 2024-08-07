import { ILectureRegister } from '@/types/lecture';
import { UseFormRegister } from 'react-hook-form';

interface ITypeProps {
  register: UseFormRegister<ILectureRegister>;
}

//TODO: tech, language, hobby
export const CATEGORY = ['IT', '어학', '취미'];

export default function Category({ register }: ITypeProps) {
  return (
    <>
      {CATEGORY.map((item: string, index: number) => (
        <li key={index}>
          <label>
            <input
              className="mr-1"
              type="radio"
              value={item}
              {...register('extra.type', {
                required: '강의 카테고리를 선택해주시기 바랍니다.',
              })}
            />
            {item}
          </label>
        </li>
      ))}
    </>
  );
}
