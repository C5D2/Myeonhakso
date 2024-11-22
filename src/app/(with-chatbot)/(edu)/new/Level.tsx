import { ILectureRegister } from '@/types/lecture';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface ILevelProps {
  register: UseFormRegister<ILectureRegister>;
}

export const LEVEL = ['입문', '초급', '중급', '고급'];

export default function Level({ register }: ILevelProps) {
  // const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  return (
    <>
      {LEVEL.map((item: string, index: number) => (
        <li key={index}>
          <label>
            <input
              className="mr-1"
              type="radio"
              value={item}
              {...register('extra.level', {
                required: '난이도를 선택해주시기 바랍니다.',
              })}
            />
            {item}
          </label>
        </li>
      ))}
    </>
  );
}
