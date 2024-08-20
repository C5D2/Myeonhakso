'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ILectureProps } from './CategoryRate';
import './LectureCalendar.css';

export default function LectureCalendar({ item }: ILectureProps) {
  const products = item.flatMap(item => item.products);
  let eventArray: object[] = [];
  let rangeColor = [
    '#91d7cf',
    // '#fff6ef',
    '#cab8e2',
    '#ffe3cd',
    '#ffccb7',
    '#ffb1ad',
  ];

  products.forEach((item, index) => {
    eventArray.push({
      title: item.name,
      start: item.extra.schedule[0],
      end: item.extra.schedule[1],
      color: rangeColor[index % rangeColor.length],
      url: `/orders/${item._id}`,
    });
  });

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
