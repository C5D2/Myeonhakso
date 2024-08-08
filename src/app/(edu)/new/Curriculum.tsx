import Button from '@/components/Button';
import { ILectureRegister } from '@/types/lecture';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface ICurriculum {
  control: Control<ILectureRegister>;
  register: UseFormRegister<ILectureRegister>;
  setValue: UseFormSetValue<ILectureRegister>;
  errors: FieldErrors<ILectureRegister>;
}

export default function Curriculum({
  control,
  register,
  setValue,
  errors,
}: ICurriculum) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extra.curriculum',
  });

  return (
    <>
      <Button type="button" onClick={() => append({ content: '' })}>
        커리큘럼 추가
      </Button>
      {fields.map((field, index) => (
        <div key={field.id} className="m-2 flex items-baseline">
          <span className="text-gray-600 mr-2 mb-2 flex-shrink-0">
            커리큘럼 {index + 1}
          </span>
          <input
            type="text"
            placeholder="일정별 커리큘럼을 입력해주세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register(`extra.curriculum.${index}.content`, {
              required: '일정별 커리큘럼을 1개 이상 입력해주시기 바랍니다.',
            })}
          />
          {index > 0 && (
            <button type="button" onClick={() => remove(index)}>
              삭제
            </button>
          )}
        </div>
      ))}
    </>
  );
}
