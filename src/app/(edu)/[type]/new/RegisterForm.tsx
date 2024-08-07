'use client';

import AddressSearch from '@/app/(edu)/[type]/new/AddressSearch';
import Category from '@/app/(edu)/[type]/new/Category';
import Curriculum from '@/app/(edu)/[type]/new/Curriculum';
import Level from '@/app/(edu)/[type]/new/Level';
import Option from '@/app/(edu)/[type]/new/Option';
import Quantity from '@/app/(edu)/[type]/new/Quantity';
import Button from '@/components/Button';
import InputError from '@/components/InputError';
import KakaoMap from '@/components/KakaoMap';
import Submit from '@/components/Submit';
import { postForm } from '@/data/actions/lectureAction';
import { ILectureRegister } from '@/types/lecture';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

// TODO: validation 확인, extra.type 보내야 함;;;
// 등록할 때 type 체크해서 그 페이지...로?
export default function RegisterForm() {
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
    defaultValues: {
      extra: {
        options: [{ days: [], startTime: null, endTime: null }],
        curriculum: [{ content: '' }],
      },
    },
  });

  const [address, setAddress] = useState<string>('');
  const [tab, setTab] = useState(0);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const onChange = (dates: [Date | undefined, Date | undefined]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleFormSubmit = async (data: ILectureRegister) => {
    if (!data.extra?.address && !data.extra?.url) {
      setError('extra.address', {
        type: 'tabError',
        message:
          '대면강의 주소 혹은 화상강의 URL 중 하나는 반드시 입력하셔야 합니다.',
      });
    }

    const resData = await postForm(data);
    if (resData.ok) {
      // router.push(`/${params.type}`);
    } else {
      if ('errors' in resData) {
        resData.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else if (resData.message) {
        alert(resData.message);
      }
    }
    console.log(data);
    console.log(data.extra);
    console.log(data.extra.options);
    console.log(data.extra.curriculum);
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
          <InputError target={errors.extra?.type} />
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
                selected={startDate}
                onChange={dates => {
                  onChange(dates);
                  onChange(dates);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            )}
          />
          <InputError target={errors.extra?.schedule} />
        </div>
        {/* 강의 옵션 추가(옵션1, 라벨....) */}
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="option">
            강의 옵션
          </label>
          <Option
            control={control}
            register={register}
            setValue={setValue}
            watch={watch}
          />
          <InputError target={errors.extra?.options} />
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
          <InputError target={errors.extra?.curriculum} />
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
          <Submit>등록</Submit>
          <Button>취소</Button>
        </div>
      </div>
    </form>
  );
}
