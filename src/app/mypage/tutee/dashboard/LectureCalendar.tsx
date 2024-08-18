'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

function LectureCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex justify-center items-center h-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border mt-auto"
      />
    </div>
  );
}

export default LectureCalendar;
