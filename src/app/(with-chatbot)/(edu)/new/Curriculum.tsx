import Button from '@/components/Button';
import InputError from '@/components/InputError';
import { ILectureRegister } from '@/types/lecture';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface ICurriculumProps {
  control: Control<ILectureRegister>;
  register: UseFormRegister<ILectureRegister>;
  setValue: UseFormSetValue<ILectureRegister>;
  errors: FieldErrors<ILectureRegister>;
}

export default function Curriculum({
  control,
  register,
  errors,
}: ICurriculumProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extra.curriculum',
  });

  return (
    <>
      <Button radius="lg" onClick={() => append({ content: '' })}>
        커리큘럼 추가
      </Button>
      <div className="mt-3 flex flex-col gap-3">
        {fields.map((field, index) => (
          <div className="bg-main-light-green/30 p-4 rounded-lg" key={field.id}>
            <div className="flex-col mb-2">
              <span className="text-gray-600 mr-2 mb-2 flex-shrink-0 font-semibold">
                커리큘럼 {index + 1}
              </span>
              {index > 0 && (
                <button
                  className="px-3 py-1 bg-main-red/50 text-white rounded hover:bg-main-red text-sm"
                  type="button"
                  onClick={() => remove(index)}
                >
                  삭제
                </button>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="일정별 커리큘럼을 입력해주세요."
                className="w-full p-4 md:p-2 border rounded-lg focus:outline-none focus:border-green-400"
                {...register(`extra.curriculum.${index}.content`, {
                  required: '일정별 커리큘럼을 1개 이상 입력해주시기 바랍니다.',
                })}
              />
            </div>
            {errors.extra?.curriculum?.[index]?.content && (
              <InputError target={errors.extra?.curriculum?.[index]?.content} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
