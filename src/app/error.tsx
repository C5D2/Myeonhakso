'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-full">
      <div className="m-auto w-full h-full max-w-[1000px] max-h-[500px] sm:max-h-[200px]">
        <iframe
          className="h-full w-full mx-auto "
          src="https://lottie.host/embed/972012c8-f94d-409c-8520-26ddf7472a78/p0v57ebR6I.json"
        ></iframe>
        {/* <img src="/error.gif" alt="" className="h-full w-full mx-auto " /> */}
        <h2 className="font-bold text-[30px] text-main-green text-center sm:text-lg">
          죄송합니다. 해당 페이지에 오류가 있습니다.
        </h2>
        <p className="font-light text-center sm:text-xs">
          올바른 URL을 입력하였는지 확인해주세요.{' '}
          <span className="sm:block">
            자세한 내용은 관리자에 문의하시기 바랍니다.
          </span>
        </p>
      </div>
    </div>
  );
}
