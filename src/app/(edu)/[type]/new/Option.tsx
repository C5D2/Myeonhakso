import classNames from 'classnames';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ko } from 'date-fns/locale';

export const DAY_OPTION = ['월', '화', '수', '목', '금', '토', '일'];

interface IOption {
  options: { days: string[]; startTime: string; endTime: string }[];
}

export default function Option() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const { control, register, setValue, watch } = useForm<IOption>({
    defaultValues: {
      options: [{ days: [], startTime: '', endTime: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const options = watch('options');

  const handleOptionToggle = (rowIndex: number, item: string) => {
    const currentField = options[rowIndex];
    const currentDays = currentField.days || [];
    const newDays = currentDays.includes(item)
      ? currentDays.filter(day => day !== item)
      : [...currentDays, item];
    setValue(`options.${rowIndex}.days`, newDays);
  };
  console.log(options);

  const onSelect = time => {
    setStartTime(time);
    setIsSelected(true);
    setEndTime(null);
  };

  return (
    <>
      <button
        className="mt-1 px-2 py-1 text-white bg-green-400 rounded-full"
        type="button"
        onClick={() => append({ days: [], startTime: '', endTime: '' })}
      >
        옵션 추가
      </button>
      {fields.map((field, rowIndex) => (
        <div key={field.id}>
          <ul className="flex items-baseline gap-2 m-2">
            <span className=" text-gray-600 mr-2 mb-2">
              옵션 {rowIndex + 1}
            </span>
            {DAY_OPTION?.map((item: string) => (
              <li key={item}>
                <button
                  type="button"
                  className={classNames(
                    'border-2 hover:bg-black/5 rounded-md px-4 py-2 flex flex-col gap-2',
                    {
                      'border-2 border-green-400':
                        options[rowIndex]?.days.includes(item),
                    },
                  )}
                  onClick={() => handleOptionToggle(rowIndex, item)}
                >
                  {item}
                </button>
              </li>
            ))}
            {/* <input
              type="time"
              min="09:00"
              max="21:00"
              {...register(`options.${rowIndex}.time`)}
            /> */}
            <Controller
              control={control}
              name={`options.${rowIndex}.startTime`}
              render={({ field: { onChange } }) => (
                <DatePicker
                  selected={startTime}
                  onChange={onSelect}
                  locale={ko}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  minTime={setHours(setMinutes(new Date(), 0), 9)}
                  maxTime={setHours(setMinutes(new Date(), 0), 21)}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="시작 시간"
                />
              )}
            />

            {isSelected ? (
              <Controller
                control={control}
                name={`options.${rowIndex}.endTime`}
                rules={{ required: '강의 옵션을 선택해주시기 바랍니다.' }}
                render={({ field: { onChange } }) => (
                  <DatePicker
                    selected={endTime}
                    onChange={time => setEndTime(time)}
                    locale={ko}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    minTime={startTime!}
                    maxTime={setHours(setMinutes(new Date(), 0), 21)}
                    excludeTimes={[startTime!]}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="종료 시간"
                  />
                )}
              />
            ) : (
              <DatePicker placeholderText="종료 시간" readOnly />
            )}

            {rowIndex > 0 && (
              <button type="button" onClick={() => remove(rowIndex)}>
                삭제
              </button>
            )}
          </ul>
        </div>
      ))}
    </>
  );
}
