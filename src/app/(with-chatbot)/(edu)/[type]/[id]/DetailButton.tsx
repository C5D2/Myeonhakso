'use client';

import Button from '@/components/Button';
import { orderLecture } from '@/data/actions/lectureAction';
import { ILectureDetail } from '@/types/lecture';
import { GetAuthInfo } from '@/utils/authUtils';
import useModalStore from '@/zustand/useModalStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Slide, toast } from 'react-toastify';

declare global {
  interface Window {
    IMP: any;
  }
}

interface IDetailButtonProps {
  params: { id: string };
  item: ILectureDetail | null;
  userInfo: { name: string | null; email: string | null };
  id: string | Date | null | undefined;
}

export default function DetailButton({
  params,
  item,
  userInfo,
}: IDetailButtonProps) {
  const router = useRouter();
  const price = item?.price;
  const userName = userInfo.name;
  const userEmail = userInfo.email;
  const { user } = GetAuthInfo();
  const openModal = useModalStore(state => state.openModal);

  useEffect(() => {
    const { IMP } = window;
    if (window.IMP) {
      IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP); // 가맹점 식별코드
    } else {
      console.error('IMP 객체가 로드되지 않았습니다.');
    }
  }, []);

  const paymentHandler = () => {
    console.log(user);
    if (!user) {
      openModal({
        title: '로그인',
        content: (
          <>
            로그인 시 이용 가능합니다. <br />
            로그인하시겠습니까?
          </>
        ),
        callbackButton: {
          확인: () => router.push('/login'),
          취소: () => {},
        },
      });
      return;
    }

    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'nice', // PG사 코드표 참조
      pay_method: 'card',
      // 주문번호는 결제창 요청 시 항상 고유 값으로 채번 되어야 합니다.
      // 결제 완료 이후 결제 위변조 대사 작업시 주문번호를 이용하여 검증이 필요하므로 주문번호는 가맹점 서버에서 고유하게(unique)채번하여 DB 상에 저장해주세요
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      name: '강의 구매',
      amount: price, // 숫자 타입
      buyer_email: userEmail,
      buyer_name: userName,
      // notice_url: "http//localhost:3002/api/payments/webhook",
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  async function callback(rsp: any) {
    const { success, error_msg, merchant_uid, imp_uid } = rsp;

    if (success) {
      // 결제 성공 시 orderLecture 함수 실행
      const orderData = {
        products: [
          {
            _id: Number(params.id),
            quantity: 1,
          },
        ],
        order_number: merchant_uid,
      };

      const resData = await orderLecture(orderData);
      if (resData.ok) {
        router.push(`/order/${params.id}`);
        toast('강의 결제가 완료되었습니다.', {
          position: 'top-center',
          transition: Slide,
        });
      } else if (resData.message) {
        toast(resData.message, {
          position: 'top-center',
          transition: Slide,
        });
      }
    } else {
      toast(error_msg, {
        position: 'top-center',
        transition: Slide,
      });
    }
  }

  return (
    <>
      <Button size="lg" radius="lg" onClick={paymentHandler}>
        <span className="text-2xl font-extrabold sm:text-xl">수강 신청</span>
      </Button>
    </>
  );
}
