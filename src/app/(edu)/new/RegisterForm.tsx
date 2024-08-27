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
import {
  patchForm,
  postForm,
  sendNotifications,
} from '@/data/actions/lectureAction';
import { ILectureDetail, ILectureRegister } from '@/types/lecture';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { produce } from 'immer';
import moment from 'moment';
import { newLectureNotification } from '@/utils/messageUtils';
import { fetchBookmarkedUserList } from '@/data/fetchLecture';
import useModalStore from '@/zustand/useModalStore';
import { Slide, toast } from 'react-toastify';
// import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import './ScheduleDatePicker.css';
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
  const openModal = useModalStore(state => state.openModal);
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

  const onRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start) {
      setValue('extra.schedule.0', moment(start).format('YYYY-MM-DD'));
    }
    if (end) {
      setValue('extra.schedule.1', moment(end).format('YYYY-MM-DD'));
    }
  };

  const handleOpenModal = () => {
    openModal({
      title: mode === 'edit' ? '강의 수정' : '강의 등록',
      content: `정말로 ${mode === 'edit' ? '수정' : '등록'}하시겠습니까?`,
      callbackButton: {
        확인: () => handleSubmit(handleFormSubmit)(),
        취소: () => {},
      },
    });
  };

  const handleFormSubmit = async (data: ILectureRegister) => {
    if (!data.extra?.address && !data.extra?.url) {
      setError('extra.address', {
        type: 'tabError',
        message:
          '대면강의 주소 혹은 화상강의 URL 중 하나는 반드시 입력하셔야 합니다.',
      });
    }

    const newData = produce(data, draft => {
      if (draft.price) {
        draft.price = Number(draft.price);
      }
      if (draft.extra) {
        draft.extra.options = draft.extra.options.map(option => ({
          ...option,
          startTime: option.startTime
            ? moment(option.startTime, 'HH:mm').format('HH:mm')
            : null,
          endTime: option.endTime
            ? moment(option.endTime, 'HH:mm').format('HH:mm')
            : null,
        }));

        draft.extra.schedule = draft.extra.schedule?.map(date =>
          date ? moment(date).format('YYYY-MM-DD') : null,
        );
      }
    });

    let resData;
    try {
      if (mode === 'edit') {
        resData = await patchForm(params.id!, newData);
        toast('강의가 수정되었습니다.', {
          position: 'top-center',
          transition: Slide,
        });
      } else {
        resData = await postForm(newData);
      }

      if (!resData || !resData.ok) {
        throw new Error('API 호출 실패');
      }

      if (mode === 'register' && resData.item) {
        try {
          const bookmarkedData = await fetchBookmarkedUserList(
            resData.item.seller_id,
          );
          if (!bookmarkedData || !bookmarkedData.item) {
            throw new Error('북마크 데이터 가져오기 실패');
          }

          const bookmarkedUsers = bookmarkedData.item.byUser;
          const byUser = bookmarkedData.item.byUser[0];

          const notifications = newLectureNotification(
            bookmarkedUsers,
            {
              id: resData.item._id,
              name: resData.item.name,
              type: resData.item.extra?.type,
            },
            byUser,
          );

          const notificationResults = await sendNotifications(notifications);

          const successCount = notificationResults.filter(
            result => result.ok,
          ).length;
          toast(
            `새 강의 "${resData.item.name}" 등록 및 알림 전송이 완료되었습니다. ${successCount}/${notifications.length}개의 알림이 전송되었습니다.`,
            {
              position: 'top-center',
              transition: Slide,
            },
          );
        } catch (error) {
          console.error('알림 생성 또는 전송 중 오류 발생:', error);
        }
      }

      const id = mode === 'edit' ? params.id : resData.item._id;
      router.push(`/${newData.extra.type}/${id}`);
    } catch (error) {
      console.error('API 호출 또는 데이터 처리 중 오류 발생:', error);
      toast('오류가 발생했습니다. 다시 시도해 주세요.', {
        position: 'top-center',
        transition: Slide,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOpenModal)}>
      <div className="max-w-[1500px] min-w-[380px] mx-auto px-56 w-full my-[50px] xl:px-56 lg:px-36 md:px-10 md:my-[20px]">
        <div className="m-4">
          <label className="block font-black text-gray-600 mb-2" htmlFor="name">
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
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="price"
          >
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
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="level"
          >
            카테고리
          </label>

          <ul className="flex gap-3">
            <Category register={register} />
          </ul>
          {/* <InputError target={errors.extra?.type} /> */}
        </div>
        <div className="m-4">
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="level"
          >
            난이도
          </label>

          <ul className="flex gap-3">
            <Level register={register} />
          </ul>
          <InputError target={errors.extra?.level} />
        </div>
        <div className="m-4">
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="quantity"
          >
            강의 참여 가능 인원
          </label>

          <Quantity register={register} />

          <InputError target={errors.quantity} />
        </div>

        {/* TODO: 강의 소개 150글자 이내로 */}
        <div className="m-4">
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="content"
          >
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
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="preview"
          >
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
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="schedule"
          >
            강의 일정
          </label>
          <Controller
            name="extra.schedule"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="ScheduleDatePicker">
                <DatePicker
                  dateFormat="YYYY-MM-DD"
                  selected={startDate}
                  onChange={(dates: [Date | null, Date | null]) => {
                    onRangeChange(dates);
                    onChange(dates);
                  }}
                  startDate={startDate || undefined}
                  endDate={endDate || undefined}
                  selectsRange
                  inline
                  locale={ko}
                />
              </div>
            )}
          />
          {/* <InputError target={errors.extra?.schedule} /> */}
        </div>
        <div className="m-4">
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="option"
          >
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
          <label
            className="block font-black text-gray-600 mb-2"
            htmlFor="curriculum"
          >
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
              'border-b-2 font-black text-gray-600 border-gray-500': tab === 0,
            })}
          >
            대면강의
          </button>
          <button
            type="button"
            onClick={() => setTab(1)}
            className={classNames('pb-1', {
              'border-b-2 font-black text-gray-600 border-gray-500': tab === 1,
            })}
          >
            화상강의
          </button>
        </div>
        <div className="m-4">
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
