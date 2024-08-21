import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      {/* <iframe src="https://lottie.host/embed/a5bae417-1274-47e3-9839-63a32c3b1956/MflT0eVjkk.json"></iframe> */}

      <Image
        src="/loading.gif"
        alt="Loading"
        width={200}
        height={200}
        className="m-auto sm:w-[100px] sm:h-[100px]"
      />
    </div>
  );
}
