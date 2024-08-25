import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, parseISO, formatISO } from 'date-fns';
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
import moment from 'moment';
import Button from '@/components/Button';

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

export default function Option({ control, setValue, watch }: IOptionProps) {
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
    console.log(time);

    if (time) {
      setValue(
        `extra.options.${rowIndex}.startTime`,
        moment(time).format('HH:mm'),
      );

      // 종료 시간을 초기화
      setValue(`extra.options.${rowIndex}.endTime`, null);
    } else {
      setValue(`extra.options.${rowIndex}.startTime`, null);
    }
  };

  const onSelectEndTime = (time: Date | null, rowIndex: number) => {
    console.log(time);
    if (time) {
      setValue(
        `extra.options.${rowIndex}.endTime`,
        moment(time).format('HH:mm'),
      );
    }
  };

  console.log(options);
  return (
    <>
      <div className="w-full mx-auto">
        <Button
          radius="lg"
          onClick={() => append({ days: [], startTime: null, endTime: null })}
        >
          옵션 추가
        </Button>
        <div className="mt-3 flex flex-col gap-3">
          {fields.map((field, rowIndex) => (
            <div
              key={field.id}
              className="bg-main-light-green/30 p-4 rounded-lg"
            >
              <div className="flex flex-wrap items-center gap-5">
                <span className="text-gray-600 font-semibold">
                  옵션 {rowIndex + 1}
                </span>
                <div className="flex flex-wrap gap-3 md:gap-2">
                  {DAY_OPTION?.map((item: string) => (
                    <button
                      key={item}
                      type="button"
                      className={classNames(
                        'border-2 hover:border-main-green text-gray-500 rounded-full px-3 py-2 text-md md:px-2 md:py-1',
                        {
                          'border-2 border-main-green':
                            options[rowIndex]?.days?.includes(item),
                        },
                      )}
                      onClick={() => handleOptionToggle(rowIndex, item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-28">
                    <DatePicker
                      selected={
                        options[rowIndex]?.startTime
                          ? moment(
                              options[rowIndex].startTime,
                              'HH:mm',
                            ).toDate()
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
                      className="w-full px-4 py-2 text-md border rounded"
                    />
                  </div>
                  <div className="flex-shrink-0 w-28">
                    <DatePicker
                      selected={
                        options[rowIndex]?.endTime
                          ? moment(options[rowIndex].endTime, 'HH:mm').toDate()
                          : null
                      }
                      onChange={(time: Date | null) =>
                        onSelectEndTime(time, rowIndex)
                      }
                      locale={ko}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      minTime={
                        options[rowIndex]?.startTime
                          ? moment(
                              options[rowIndex].startTime,
                              'HH:mm',
                            ).toDate()
                          : setHours(setMinutes(new Date(), 0), 9)
                      }
                      maxTime={setHours(setMinutes(new Date(), 0), 21)}
                      excludeTimes={
                        options[rowIndex]?.startTime
                          ? [
                              moment(
                                options[rowIndex].startTime,
                                'HH:mm',
                              ).toDate(),
                            ]
                          : []
                      }
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="종료 시간"
                      disabled={!options[rowIndex]?.startTime}
                      className="w-full px-4 py-2 text-md border rounded"
                    />
                  </div>
                  {rowIndex > 0 && (
                    <button
                      className="px-3 py-1 bg-main-red/50 text-white rounded hover:bg-main-red text-sm"
                      type="button"
                      onClick={() => remove(rowIndex)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
