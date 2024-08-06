'use client';

import Button from '@/components/Button';
import Submit from '@/components/Submit';
import { signup } from '@/data/actions/userAction';
import { fetchEmailValidation } from '@/data/postFetch';
import { UserForm } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Signupform() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm<UserForm>();

  const [selectedType, setSelectedType] = useState('user');
  const handleTypeClick = (value: 'user' | 'seller') => {
    setSelectedType(value);
    setValue('type', value);
  };

  const emailValue = watch('email', '');

  const addUser = async (formData: UserForm) => {
    const userData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      console.log('Key:', key, 'Value:', value);
      if(key !== 'attach'){
        userData.append(key, value as string);
      }
    });
    if(formData.attach){
      userData.append('attach', formData.attach[0]);
      console.log('Attach:', formData.attach[0]);
    }

    const resData = await signup(userData);
    console.log('Response Data:', resData);
    if(resData.ok){
      alert(`${resData.item.name}님 회원가입을 환영합니다.`);
      router.push('/');
    }else{ // API 서버의 에러 메시지 처리
      if('errors' in resData){
        resData.errors.forEach(error => setError(error.path, { message: error.msg }));
      }else if(resData.message){
        alert(resData.message);
      }
    }
  };


  const handleEmailValidationClick = async () => {
    try {
      const response = await fetchEmailValidation(emailValue);
      if (response.ok === 1) {
        alert('사용 가능한 이메일입니다.');
      } else if(response.ok === 0) {
        alert('이미 사용 중인 이메일입니다.');
      }
    } catch (error) {
      console.error('Error during email validation:', error)
      alert('이메일 확인 중 오류가 발생했습니다.');
    }
  };

  
  return (
    <form
      action="/"
      onSubmit={handleSubmit(addUser)}
      className="max-w-screen-md mx-auto mt-14"
    >
      <div className="mb-12 flex justify-center gap-14" id="type">
          <button
						 className={`px-8 py-4 ${selectedType === 'user' ? 'bg-main-green' : 'bg-main-gray'} hover:bg-main-yellow text-white font-semibold rounded-md cursor-pointer`}
            value="user"
            onClick={() => handleTypeClick('user')}
          >
            일반회원
          </button>
        <button
					 className={`px-8 py-4 ${selectedType === 'seller' ? 'bg-main-yellow' : 'bg-main-gray'} hover:bg-main-yellow text-white font-semibold rounded-md cursor-pointer`}
          value="seller"
          onClick={() => handleTypeClick('seller')}
        >
          강사회원
        </button>
        <input
          type="hidden"
          {...register('type', { required: true })}
          value={selectedType}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-500 mb-2 font-semibold"
          htmlFor="name"
        >
          이름
        </label>
        <input
          id="name"
          type="name"
          placeholder="이름을 입력하세요"
          className="w-full px-3 py-2 border rounded-md"
          {...register('name', {
            required: '이름을 입력하세요.',
            minLength: {
              value: 2,
              message: '이름을 2글자 이상 입력해주세요.',
            },
          })}
        />
        {/* <p className="ml-2 mt-1 text-sm text-red-500">이메일은 필수입니다.</p> */}
      </div>
      <div className="mb-8">
        <div className="flex justify-between ">
          <label
            className="block text-gray-500 mb-2 font-semibold pt-2"
            htmlFor="email"
          >
            이메일
          </label>
          <div className="flex align-bottom mb-2" >
            <Button size="sm" radius="lg" onClick={handleEmailValidationClick}>
              중복확인
            </Button>
          </div>
        </div>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          className="w-full px-3 py-2 border rounded-md"
          {...register('email', {
            required: '이메일은 필수 입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식이 아닙니다.',
            },
          })}
        />
        {/* <p className="ml-2 mt-1 text-sm text-red-500">이메일은 필수입니다.</p> */}
      </div>
      <div className="mb-8">
        <label
          className="block text-gray-500 mb-2 font-semibold"
          htmlFor="password"
        >
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="w-full px-3 py-2 border rounded-md"
          {...register('password', { required: '비밀번호를 입력하세요' })}
        />
        {/* <p className="ml-2 mt-1 text-sm text-red-500">비밀번호는 필수입니다.</p>
				<a href="#" className="block mt-6 ml-auto text-gray-500 text-sm hover:underline">비밀번호를 잊으셨나요?</a> */}
      </div>
      <div className="mb-8">
        <label
          className="block text-gray-500 mb-2 font-semibold"
          htmlFor="attach"
        >
          프로필 이미지
        </label>
        <div className="w-50 h-50 border rounded-md ">
          <input
            type="file"
            id="attach"
            accept="image/*"
            placeholder="이미지를 선택하세요"
            className="w-full px-3 py-2 border rounded-lg"
            { ...register('attach') }
          />
        </div>

        {/* <p className="ml-2 mt-1 text-sm text-red-500">비밀번호는 필수입니다.</p>
				<a href="#" className="block mt-6 ml-auto text-gray-500 text-sm hover:underline">비밀번호를 잊으셨나요?</a> */}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <Submit className="w-full px-3 py-4 bg-main-green hover:bg-main-yellow text-white font-semibold rounded-md">
          회원가입
        </Submit>
      </div>
      <div className="flex items-center my-4 mt-16">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 text-gray-400 text-xl font-semibold">
          간편 회원가입
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="flex justify-center space-x-12 my-4 mt-6">
        <img
          src="/images/naver-login.svg"
          alt="Naver"
          className="h-10 w-10 cursor-pointer"
        />
        <img
          src="/images/kakao-talk.svg"
          alt="KakaoTalk"
          className="h-10 w-10 cursor-pointer"
        />
        <img
          src="/images/google-login.svg"
          alt="Google"
          className="h-10 w-10 cursor-pointer"
        />
      </div>
    </form>
  );
}

export default Signupform;
