import Image from 'next/image';

export default function Loading() {
  return (
    <>
      {/* <iframe src="https://lottie.host/embed/a5bae417-1274-47e3-9839-63a32c3b1956/MflT0eVjkk.json"></iframe> */}

      <Image
        src="/loading.gif"
        alt="Loading"
        width={200}
        height={200}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-[100px] sm:h-[100px]"
      />
    </>
  );
}
