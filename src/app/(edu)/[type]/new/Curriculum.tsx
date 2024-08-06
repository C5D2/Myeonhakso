import { useFieldArray, useForm } from 'react-hook-form';

export default function Curriculum() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      extra: {
        curriculum: [{ content: '' }],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extra.curriculum',
  });

  return (
    <>
      <button
        type="button"
        onClick={() => append({ content: '' })}
        className="mb-2 px-2 py-1 bg-green-400 text-white rounded-full"
      >
        커리큘럼 추가
      </button>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex">
          <span className=" text-gray-600 mr-2 mb-2">커리큘럼 {index + 1}</span>
          <input
            type="text"
            id="curriculum"
            placeholder="일정별 커리큘럼을 입력하세요"
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
