import { ILectureRegister } from '@/types/lecture';
import { useForm, UseFormRegister } from 'react-hook-form';

interface IQuantityProps {
  register: UseFormRegister<ILectureRegister>;
}

export const QUANTITY = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function Quantity({ register }: IQuantityProps) {
  const {
    formState: { errors },
  } = useForm();

  return (
    <select
      id="quantity"
      defaultValue=""
      {...register('quantity', {
        required: '인원을 선택해주세요.',
      })}
    >
      <option value="" disabled>
        선택해주세요
      </option>
      {QUANTITY.map(number => (
        <option key={number} value={number}>
          {number}
        </option>
      ))}
    </select>
  );
}
