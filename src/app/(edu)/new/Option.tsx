import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, format, parseISO, formatISO } from 'date-fns';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form';
import { ko } from 'date-fns/locale';
import classNames from 'classnames';
import { ILectureRegister } from '@/types/lecture';

export const DAY_OPTION = ['월', '화', '수', '목', '금', '토', '일'];

interface IOptionProps {
  control: Control<ILectureRegister>;
  register: UseFormRegister<ILectureRegister>;
  setValue: UseFormSetValue<ILectureRegister>;
  watch: UseFormWatch<ILectureRegister>;
  days: string[];
  startTime: string | null;
  endTime: string | null;
}

export default function Option({
  control,
  register,
  setValue,
  watch,
}: IOptionProps) {
  const { fields, append, remove } = useFieldArray<
    ILectureRegister,
    'extra.options'
  >({
    control,
    name: 'extra.options',
  });

  const options = watch('extra.options');

  const handleOptionToggle = (rowIndex: number, item: string) => {
    const currentField = options[rowIndex];
    const currentDays = currentField.days || [];
    const newDays = currentDays.includes(item)
      ? currentDays.filter(day => day !== item)
      : [...currentDays, item];
    setValue(`extra.options.${rowIndex}.days`, newDays);
  };

  const onSelectStartTime = (time: Date | null, rowIndex: number) => {
    setValue(
      `extra.options.${rowIndex}.startTime`,
      time ? formatISO(time) : null,
    );
    setValue(`extra.options.${rowIndex}.endTime`, null);
  };

  const onSelectEndTime = (time: Date | null, rowIndex: number) => {
    setValue(
      `extra.options.${rowIndex}.endTime`,
      time ? formatISO(time) : null,
    );
  };

  return (
    <>
      <button
        className="mt-1 px-2 py-1 text-white bg-green-400 rounded-full"
        type="button"
        onClick={() => append({ days: [], startTime: null, endTime: null })}
      >
        옵션 추가
      </button>
      {fields.map((field, rowIndex) => (
        <div key={field.id}>
          <ul className="flex items-baseline gap-2 m-2">
            <span className="text-gray-600 mr-2 mb-2 flex-shrink-0">
              옵션 {rowIndex + 1}
            </span>
            {DAY_OPTION?.map((item: string) => (
              <li key={item}>
                <button
                  type="button"
                  className={classNames(
                    'border-2 hover:bg-black/5 rounded-md px-4 py-2 flex flex-col gap-2 md:px-2 md:py-1',
                    {
                      'border-2 border-green-400':
                        options[rowIndex]?.days?.includes(item),
                    },
                  )}
                  onClick={() => handleOptionToggle(rowIndex, item)}
                >
                  {item}
                </button>
              </li>
            ))}
            <DatePicker
              selected={
                options[rowIndex]?.startTime
                  ? parseISO(options[rowIndex].startTime)
                  : null
              }
              onChange={(time: Date | null) =>
                onSelectStartTime(time, rowIndex)
              }
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

            <DatePicker
              selected={
                options[rowIndex]?.endTime
                  ? parseISO(options[rowIndex].endTime)
                  : null
              }
              onChange={(time: Date | null) => onSelectEndTime(time, rowIndex)}
              locale={ko}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              minTime={
                options[rowIndex]?.startTime
                  ? parseISO(options[rowIndex].startTime)
                  : setHours(setMinutes(new Date(), 0), 9)
              }
              maxTime={setHours(setMinutes(new Date(), 0), 21)}
              excludeTimes={
                options[rowIndex]?.startTime
                  ? [parseISO(options[rowIndex].startTime)]
                  : []
              }
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="종료 시간"
              disabled={!options[rowIndex]?.startTime}
            />
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
