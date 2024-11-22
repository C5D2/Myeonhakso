import Submit from '@/components/Submit';
import {
  signInWithCredentials,
  signUpWithGoogle,
  signUpWithKaKao,
  signUpWithNaver,
} from '@/data/actions/authAction';
import Link from 'next/link';

async function testLogin(role: 'student' | 'teacher') {
  'use server';

  const credentials = {
    student: {
      email: 'student1@myeonhakso.com',
      password: '11111111',
    },
    teacher: {
      email: 'teacher1@myeonhakso.com',
      password: '11111111',
    },
  };

  const { email, password } = credentials[role];

  const formData = new FormData();
  formData.set('email', email);
  formData.set('password', password);

  return signInWithCredentials(formData);
}

function LoginForm() {
  return (
    <form action={signInWithCredentials} className="max-w-full mx-20 mt-14 ">
      <div className="mb-8">
        <label
          className="block text-gray-500 mb-2 font-semibold"
          htmlFor="email"
        >
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          className="w-full px-3 py-2 border rounded-md "
          name="email"
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
          name="password"
        />
        {/* <p className="ml-2 mt-1 text-sm text-red-500">비밀번호는 필수입니다.</p>
				<a href="#" className="block mt-6 ml-auto text-gray-500 text-sm hover:underline">비밀번호를 잊으셨나요?</a> */}
      </div>
      <div className="mt-10 flex flex-col gap-5 justify-center items-center">
        <Submit className="w-full px-3 py-4 bg-main-green hover:bg-main-yellow text-white font-semibold rounded-md">
          로그인
        </Submit>
        <Submit
          formAction={async () => {
            'use server';
            await testLogin('student');}}
          className="w-full px-3 py-4 bg-main-green hover:bg-main-yellow text-white font-semibold rounded-md"
        >
          학생 계정으로 체험하기
        </Submit>
        <Submit
          formAction={async () => {
            'use server';
            await testLogin('teacher');}}
          className="w-full px-3 py-4 bg-main-green hover:bg-main-yellow text-white font-semibold rounded-md"
        >
          선생님 계정으로 체험하기
        </Submit>
      </div>
      <div className="flex items-center my-4 mt-16">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 text-gray-400 text-xl font-semibold">
          간편 로그인
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="flex justify-center space-x-12 my-4 mt-6">
        <button formAction={signUpWithNaver}>
          <img
            src="/images/naver-login.svg"
            alt="Naver"
            className="h-10 w-10 cursor-pointer"
          />
        </button>

        <button type="submit" formAction={signUpWithKaKao}>
          <img
            src="/images/kakao-talk.svg"
            alt="KakaoTalk"
            className="h-10 w-10 cursor-pointer"
          />
        </button>

        <button type="submit" formAction={signUpWithGoogle}>
          <img
            src="/images/google-login.svg"
            alt="Google"
            className="h-10 w-10 cursor-pointer"
          />
        </button>
      </div>
      <div className="mt-10 flex gap-2 items-center">
        <p className="ml-auto text-gray-400 text-sm font-light inline-block">
          아직 면학소 회원이 아니신가요 ?
        </p>
        <Link href="/signup" className="text-gray-50">
          회원가입
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
