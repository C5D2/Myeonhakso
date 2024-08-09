'use client';

import Button from '@/components/Button';
import Payment from '@/components/Payment';
import { orderLecture } from '@/data/actions/lectureAction';
import { useRouter } from 'next/navigation';

export default function DetailButton({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleLectureOrder = async () => {
    const data = {
      products: [
        {
          _id: Number(params.id),
          quantity: 1,
        },
      ],
    };

    const resData = await orderLecture(data);
    if (resData.ok) {
      Payment();

      const id = resData._id;
      router.push(`/lecutre/${id}`);
    } else if (resData.message) {
      alert(resData.message);
    }
  };

  return <Button onClick={handleLectureOrder}>수강 신청</Button>;
}
