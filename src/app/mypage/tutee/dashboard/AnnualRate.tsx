'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ILectureProps } from './CategoryRate';

const chartConfig = {
  lecture: {
    label: 'lecture',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function AnnualRate({ item }: ILectureProps) {
  let chartData = [
    { month: '1월', lecture: 0 },
    { month: '2월', lecture: 0 },
    { month: '3월', lecture: 0 },
    { month: '4월', lecture: 0 },
    { month: '5월', lecture: 0 },
    { month: '6월', lecture: 0 },
    { month: '7월', lecture: 0 },
    { month: '8월', lecture: 0 },
    { month: '9월', lecture: 0 },
    { month: '10월', lecture: 0 },
    { month: '11월', lecture: 0 },
    { month: '12월', lecture: 0 },
  ];
  const nowYear = new Date().getFullYear(); // 현재 년도

  const products = item.flatMap(item => item.products);
  const lectureDate = products.map(item => item.extra.schedule[0]); //현재 년도와 맞는 년도만 추출

  const nowYearLecture = lectureDate.filter(item => item?.includes('2024'));

  const month = nowYearLecture.map(item => item?.substring(6, 7));

  for (let i = 0; i < month.length; i++) {
    let numMonth = Number(month[i]) - 1;
    chartData[numMonth].lecture++;
  }

  return (
    <Card className="p-2 mb-2">
      {/* <CardHeader>
        <CardTitle>{nowYear} 년도 강의 수강 현황</CardTitle>
        <CardDescription>{nowYear} 년도 강의 수강 현황</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="lecture"
              type="linear"
              stroke="var(--color-lecture)"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm sm:text-xs">
        <div className="flex gap-2 font-medium leading-none">
          {nowYear} 년도 강의 수강 현황
        </div>
        <div className="leading-none text-muted-foreground">
          {nowYear} 년도에 수강한 강의 수를 확인할 수 있습니다.
        </div>
      </CardFooter>
    </Card>
  );
}
