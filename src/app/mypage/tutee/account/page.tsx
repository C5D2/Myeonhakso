import Submit from "@/components/Submit";

function Page() {
  return (
    <form
    action="/"
    // onSubmit={handleSubmit(addUser)}
    className="max-w-4xl mx-40"
    >
    <div className="mb-12 flex justify-center gap-14" id="type">
        {/* <button
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
      </button> */}
      <input
        type="hidden"
        // {...register('type', { required: true })}
        // value={selectedType}
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
        // {...register('name', {
        //   required: '이름을 입력하세요.',
        //   minLength: {
        //     value: 2,
        //     message: '이름을 2글자 이상 입력해주세요.',
        //   },
        // })}
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
      </div>
      <input
        id="email"
        type="email"
        placeholder="이메일을 입력하세요"
        className="w-full px-3 py-2 border rounded-md"
        // {...register('email', {
        //   required: '이메일은 필수 입니다.',
        //   pattern: {
        //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        //     message: '이메일 형식이 아닙니다.',
        //   },
        // })}
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
        // {...register('password', { required: '비밀번호를 입력하세요' })}
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
          // { ...register('attach') }
        />
      </div>

      {/* <p className="ml-2 mt-1 text-sm text-red-500">비밀번호는 필수입니다.</p>
      <a href="#" className="block mt-6 ml-auto text-gray-500 text-sm hover:underline">비밀번호를 잊으셨나요?</a> */}
    </div>
    <div className="mt-10 flex justify-center items-center">
      <Submit className="w-full px-3 py-4 bg-main-green hover:bg-main-yellow text-white font-semibold rounded-md">
        회원 정보 수정
      </Submit>
    </div>
  </form>
  );
}

export default Page;
