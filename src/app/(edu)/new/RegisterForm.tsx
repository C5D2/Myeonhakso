'use client';

import AddressSearch from '@/app/(edu)/new/AddressSearch';
import Category from '@/app/(edu)/new/Category';
import Curriculum from '@/app/(edu)/new/Curriculum';
import Level from '@/app/(edu)/new/Level';
import Option from '@/app/(edu)/new/Option';
import Quantity from '@/app/(edu)/new/Quantity';
import Button from '@/components/Button';
import InputError from '@/components/InputError';
import KakaoMap from '@/components/KakaoMap';
import Submit from '@/components/Submit';
import { patchForm, postForm } from '@/data/actions/lectureAction';
import { ILectureDetail, ILectureRegister } from '@/types/lecture';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { produce } from 'immer';
import moment from 'moment';

interface IRegisterFormProps {
  params: {
    id?: string;
    type: string;
  };
  mode: 'register' | 'edit';
  lectureDetailData: ILectureRegister | ILectureDetail | null;
}

// TODO: validation 확인, extra.type 보내야 함;;;
// 등록할 때 type 체크해서 그 페이지...로?
// 강의 가격 최소 금액 100원
export default function RegisterForm({
  params,
  mode,
  lectureDetailData,
}: IRegisterFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm<ILectureRegister>({
    defaultValues: lectureDetailData || {
      extra: {
        options: [{ days: [], startTime: null, endTime: null }],
        curriculum: [{ content: '' }],
      },
    },
  });

  const [address, setAddress] = useState<string>('');
  const [tab, setTab] = useState(0);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null | undefined>(undefined);

  useEffect(() => {
    if (mode === 'edit' && lectureDetailData?.extra?.schedule) {
      const [start, end] = lectureDetailData.extra.schedule;
      if (start) setStartDate(new Date(start));
      if (end) setEndDate(new Date(end));
    }
  }, [mode, lectureDetailData]);

  console.log(lectureDetailData);

  const convertToUTC = (date: Date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  };

  const onRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(moment(start).format('YYYY-MM-DD  HH:mm:ss'));
    if (start) {
      setValue('extra.schedule.0', convertToUTC(start).toISOString());
    }

    if (end) {
      setValue('extra.schedule.1', convertToUTC(end).toISOString());
    }
  };

  const handleFormSubmit = async (data: ILectureRegister) => {
    if (!data.extra?.address && !data.extra?.url) {
      setError('extra.address', {
        type: 'tabError',
        message:
          '대면강의 주소 혹은 화상강의 URL 중 하나는 반드시 입력하셔야 합니다.',
      });
    }

    // const newData = {
    //   ...data,
    //   extra: {
    //     ...data.extra,
    //     options: data.extra.options.map(option => ({
    //       ...option,
    //       startTime: option.startTime
    //         ? convertToUTC(new Date(option.startTime)).toISOString()
    //         : null,
    //       endTime: option.endTime
    //         ? convertToUTC(new Date(option.endTime)).toISOString()
    //         : null,
    //     })),
    //     schedule: data.extra.schedule?.map(date =>
    //       date ? convertToUTC(new Date(date)).toISOString() : null,
    //     ),
    //   },
    // };

    const newData = produce(data, draft => {
      if (draft.extra) {
        console.log(draft.extra.options);
        draft.extra.options = draft.extra.options.map(option => ({
          ...option,
          startTime: option.startTime
            ? moment(option.startTime).format('HH:mm')
            : null,
          endTime: option.endTime
            ? moment(option.endTime).format('HH:mm')
            : null,
        }));

        draft.extra.schedule = draft.extra.schedule?.map(date =>
          date ? convertToUTC(new Date(date)).toISOString() : null,
        );
      }
    });

    let resData;
    if (mode === 'edit') {
      resData = await patchForm(params.id!, newData);
    } else {
      resData = await postForm(newData);
    }
    console.log(resData);
    if (resData.ok) {
      const id = mode === 'edit' ? params.id : resData.item._id;
      router.push(`/${newData.extra.type}/${id}`);
    } else {
      if ('errors' in resData) {
        resData.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (resData.message) {
        alert(resData.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mx-[170px] my-[100px] md:mx-[30px] md:my-[20px]">
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="name">
            강의 이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="강의 제목을 입력해주세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register('name', {
              required: '강의 이름을 입력해주시기 바랍니다.',
            })}
          />
          <InputError target={errors.name} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="price">
            강의 가격
          </label>
          <input
            type="number"
            id="price"
            min="0"
            placeholder="강의 가격을 입력해주세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register('price', {
              required: '강의 가격을 입력해주시기 바랍니다.',
            })}
          />
          <InputError target={errors.price} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="level">
            카테고리
          </label>

          <ul className="flex gap-3">
            <Category register={register} />
          </ul>
          {/* <InputError target={errors.extra?.type} /> */}
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="level">
            난이도
          </label>

          <ul className="flex gap-3">
            <Level register={register} />
          </ul>
          <InputError target={errors.extra?.level} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="quantity">
            강의 참여 가능 인원
          </label>

          <Quantity register={register} />

          <InputError target={errors.quantity} />
        </div>

        {/* TODO: 강의 소개 150글자 이내로 */}
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="content">
            강의 소개
          </label>
          <input
            type="textarea"
            id="content"
            placeholder="강의 소개를 입력해주세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register('content', {
              required: '강의 소개를 입력해주시기 바랍니다.',
            })}
          />
          <InputError target={errors.content} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="preview">
            미리보기 강의 영상
          </label>
          <input
            type="input"
            id="preview"
            placeholder="미리보기 강의 영상 URL을 입력해주세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register('extra.preview', {
              required: '미리보기 강의 영상 URL을 입력해주시기 바랍니다.',
            })}
          />
          <InputError target={errors.extra?.preview} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="schedule">
            강의 일정
          </label>
          {/* <input
            type="date"
            id="schedule"
            placeholder="강의 일정을 선택하세요."
            {...register('extra.schedule', {
              required: '강의 일정을 선택해주시기 바랍니다.',
            })}
          /> */}
          <Controller
            name="extra.schedule"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                dateFormat={'YYYY-MM-DD'}
                selected={startDate}
                onChange={(dates: [Date | null, Date | null]) => {
                  onRangeChange(dates);
                }}
                startDate={startDate || undefined}
                endDate={endDate || undefined}
                selectsRange
                inline
              />
            )}
          />
          {/* <InputError target={errors.extra?.schedule} /> */}
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="option">
            강의 옵션
          </label>
          <Option
            control={control}
            register={register}
            setValue={setValue}
            watch={watch}
            days={[]}
            startTime={null}
            endTime={null}
          />
          {/* <InputError target={errors.extra?.options} /> */}
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="curriculum">
            커리큘럼
          </label>
          <Curriculum
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          {/* <InputError target={errors.extra?.curriculum} /> */}
        </div>
        {/* TODO: 탭 선택 시 표시 */}
        <div className="flex m-4 gap-3">
          <button
            type="button"
            onClick={() => setTab(0)}
            className={classNames('pb-1', {
              'border-b-2 border-gray-500': tab === 0,
            })}
          >
            대면강의
          </button>
          <button
            type="button"
            onClick={() => setTab(1)}
            className={classNames('pb-1', {
              'border-b-2 border-gray-500': tab === 1,
            })}
          >
            화상강의
          </button>
        </div>
        <div className="m-4">
          {/* <label className="block text-gray-600 mb-2" htmlFor="address">
            대면강의
          </label> */}
          {tab === 0 && (
            <div>
              <AddressSearch
                setValue={setValue}
                register={register}
                setAddress={setAddress}
              />

              <InputError target={errors.extra?.address} />
              <div className="mt-3">
                <KakaoMap address={address} />
              </div>
            </div>
          )}
        </div>
        <div className="m-4">
          {tab === 1 && (
            <div>
              <input
                type="input"
                id="online"
                placeholder="화상강의 주소를 입력해주세요."
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
                {...register('extra.url')}
              />
              <InputError target={errors.extra?.url} />
            </div>
          )}
        </div>
        {errors.extra?.address && (
          // <div className="text-sm mt-2">{errors.extra.address.message}</div>
          <InputError target={errors.extra?.address} />
        )}
        <div className="m-4 flex justify-center items-center">
          <Submit>{mode === 'edit' ? '수정' : '등록'}</Submit>
          {mode === 'edit' ? (
            <Link href={'/mypage/tutor/management'}>
              <Button>취소</Button>
            </Link>
          ) : (
            <Link href={'/'}>
              <Button>취소</Button>
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}
