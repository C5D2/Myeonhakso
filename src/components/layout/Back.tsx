'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Back() {
  const router = useRouter();
  const pathName = usePathname();
  let rootValid: boolean;

  if (pathName === '/') {
    rootValid = true;
  } else {
    rootValid = false;
  }

  return (
    <>
      {pathName === '/' ? (
        ''
      ) : (
        <Image
          onClick={() => router.back()}
          src="/right-arrow.svg"
          alt="뒤로가기"
          width={20}
          height={20}
          className="rotate-180"
        />
      )}
    </>
  );
}
