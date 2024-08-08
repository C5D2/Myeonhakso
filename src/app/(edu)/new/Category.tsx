import { ILectureRegister } from '@/types/lecture';
import { UseFormRegister } from 'react-hook-form';

interface ITypeProps {
  register: UseFormRegister<ILectureRegister>;
}

//TODO: tech, language, hobby
export const CATEGORY = [
  { label: 'IT', value: 'tech' },
  { label: '어학', value: 'language' },
  { label: '취미', value: 'hobby' },
];

export default function Category({ register }: ITypeProps) {
  return (
    <>
      {CATEGORY.map((item, index) => (
        <li key={index}>
          <label>
            <input
              className="mr-1"
              type="radio"
              value={item.value}
              {...register('extra.type', {
                required: '강의 카테고리를 선택해주시기 바랍니다.',
              })}
            />
            {item.label}
          </label>
        </li>
      ))}
    </>
  );
}
