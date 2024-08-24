'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './LectureCalendar.css';
import { usePathname } from 'next/navigation';
import { IOrderSaleList } from '@/types/mypage';
import { Ilecture } from '@/types/lecture';

interface IDashboardProp {
  index?: number;
  item: IOrderSaleList[] | Ilecture[];
}

export default function LectureCalendar({ item }: IDashboardProp) {
  //학생일 때
  const pathName = usePathname();
  const type = pathName.split('/')[2];
  let products;
  let eventArray: object[] = [];
  let rangeColor = [
    '#91d7cf',
    // '#fff6ef',
    '#cab8e2',
    '#ffe3cd',
    '#ffccb7',
    '#ffb1ad',
  ];

  const istuteeList = (
    item: IOrderSaleList[] | Ilecture[],
  ): item is IOrderSaleList[] => {
    return item.length > 0 && 'products' in item[0];
  };

  if (istuteeList(item)) {
    //tutee인 경우

    products = item.flatMap(item => item.products);
    products?.forEach((item, index) => {
      eventArray.push({
        title: item.name,
        start: item.extra.schedule[0],
        end: item.extra.schedule[1],
        color: rangeColor[index % rangeColor.length],
        url: `/orders/${item._id}`,
      });
    });
  } else {
    //tutor인 경우
    products = item.filter(item => item.extra);
    products?.forEach((item, index) => {
      eventArray.push({
        title: item.name,
        start: item.extra.schedule[0],
        end: item.extra.schedule[1],
        color: rangeColor[index % rangeColor.length],
        url: `/orders/${item._id}`,
      });
    });
  }

  // if (type === 'tutee') {
  //   products = item.flatMap(item => item.products);
  //   products?.forEach((item, index) => {
  //     eventArray.push({
  //       title: item.name,
  //       start: item.extra.schedule[0],
  //       end: item.extra.schedule[1],
  //       color: rangeColor[index % rangeColor.length],
  //       url: `/orders/${item._id}`,
  //     });
  //   });
  // } else if (type === 'tutor') {
  //   products = item.flatMap(item => item.extra);
  // }

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dayMaxEvents={true}
      events={eventArray}
      height={'90%'}
      editable={true}
    />
  );
}
