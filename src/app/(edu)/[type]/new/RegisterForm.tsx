'use client';

import AddressSearch from '@/app/(edu)/[type]/new/AddressSearch';
import Curriculum from '@/app/(edu)/[type]/new/Curriculum';
import Level from '@/app/(edu)/[type]/new/Level';
import Option from '@/app/(edu)/[type]/new/Option';
import InputError from '@/components/InputError';
import KakaoMap from '@/components/KakaoMap';
import { ILectureRegister } from '@/types/lecture';
import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// TODO: validation 확인
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<ILectureRegister>();

  // const registerLecture = async(formData: Post) => {
  //   const resData = await
  // };
  const [address, setAddress] = useState<string>('');
  const [tab, setTab] = useState(0);

  const handleFormSubmit = (data: ILectureRegister) => {
    if (!data.extra?.address && !data.extra?.url) {
      setError('extra.address', {
        type: 'tabError',
        message:
          '대면강의 주소 혹은 화상강의 URL 중 하나는 반드시 입력하셔야 합니다.',
      });
    }
    console.log(data);
  };

  return (
    // <form action="/">
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mx-[170px] my-[100px]">
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="name">
            강의 제목
          </label>
          <input
            type="text"
            id="name"
            placeholder="강의 제목을 입력해주세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register('name', {
              required: '강의 제목을 입력해주시기 바랍니다.',
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
            난이도
          </label>
          {/* <input
            type="checkbox"
            id="level"
            placeholder="난이도를 입력해주세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register('extra.level', {
              required: '난이도를 입력해주시기 바랍니다.',
            })}
          /> */}
          <ul className="flex gap-3">
            <Level register={register} />
          </ul>
          <InputError target={errors.extra?.level} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="content">
            강의 소개
          </label>
          <input
            type="textarea"
            id="content"
            placeholder="강의 소개를 입력하세요."
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-400"
            {...register('extra.content', {
              required: '강의 소개를 입력해주시기 바랍니다.',
            })}
          />
          <InputError target={errors.extra?.content} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="preview">
            미리보기 강의 영상
          </label>
          <input
            type="input"
            id="preview"
            placeholder="미리보기 강의 영상 URL을 입력하세요."
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
          <input
            type="date"
            id="schedule"
            placeholder="강의 일정을 선택하세요."
            {...register('extra.schedule', {
              required: '강의 일정을 선택해주시기 바랍니다.',
            })}
          />
          <InputError target={errors.extra?.schedule} />
        </div>

        {/* 강의 옵션 추가(옵션1, 라벨....) */}

        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="option">
            강의 옵션
          </label>
          {/* <input
            type="input"
            id="option"
            placeholder="강의 옵션을 선택해주세요."
            {...register('extra.option', {
              required: '강의 옵션을 선택해주시기 바랍니다.',
            })}
          /> */}
          <Option />
          <InputError target={errors.extra?.options} />
        </div>
        <div className="m-4">
          <label className="block text-gray-600 mb-2" htmlFor="curriculum">
            커리큘럼
          </label>
          {/* input 배열 여러개의 내용이 배열 한 번에 들어가게...? */}
          <Curriculum />
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
                errors={errors}
                setAddress={setAddress}
              />
              {/* <input
          type="input"
          id="offline"
          placeholder="대면강의 장소를 입력해주세요."
          {...register('offline', {
            required: '대면강의 장소를 입력해주시기 바랍니다.',
          })}
        /> */}
              <InputError target={errors.extra?.address} />
              <div className="mt-3">
                <KakaoMap address={address} />
              </div>
            </div>
          )}
        </div>
        <div className="m-4">
          {/* <label className="block text-gray-600 mb-2" htmlFor="url">
            화상강의
          </label> */}
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
          <div className="text-sm mt-2">{errors.extra.address.message}</div>
        )}

        <div className="m-4 flex justify-center items-center">
          <button>등록</button>
          <button>취소</button>
        </div>
      </div>
    </form>
  );
}
