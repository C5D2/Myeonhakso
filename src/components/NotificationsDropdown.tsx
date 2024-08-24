'use client';

import { NotiMessageType } from '@/types/notification';
import moment from 'moment';

export default function NotificationsDropdown({
  notifications,
}: {
  notifications: NotiMessageType[];
}) {
  // const [notifications, setNotifications] = useState<INotification[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       setIsLoading(true);
  //       const session = await getSession();

  //       if (!session?.accessToken) {
  //         throw new Error('인증 토큰이 없습니다.');
  //       }

  //       const response = await fetch(`${SERVER}/notifications`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'client-id': `${CLIENT_ID}`,
  //           Authorization: `Bearer ${session.accessToken}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`API 호출 실패: ${response.status}`);
  //       }

  //       const data: INotificationResponse = await response.json();
  //       setNotifications(data.item);
  //     } catch (err) {
  //       console.error('알림 가져오기 오류:', err);
  //       setError(
  //         err instanceof Error
  //           ? err.message
  //           : '알림을 불러오는 데 실패했습니다.',
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchNotifications();
  // }, []);

  // if (isLoading) return console.log('알림을 불러오는 중...');

  // if (error) return console.log(error);

  return (
    <div className="absolute w-[200px] top-16 md:right-5 md:top-11 text-center text-black bg-white rounded-lg shadow-md z-[99]">
      <div className="text-lg text-gray-700 font-black px-2 py-1 border-b-[2px] border-x-main-dark-green">
        알림
      </div>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map(notification => (
            <li
              key={notification._id}
              className="px-3 py-2 border-b last:border-b-0"
            >
              <div className="rounded-md bg-light-green text-xs text-gray-90 mb-1">
                {moment(notification.createdAt).format('YYYY-MM-DD')}
              </div>
              <div className="text-sm">{notification.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-3 py-2 text-sm text-gray-500">알림이 없습니다.</div>
      )}
    </div>
  );
}
