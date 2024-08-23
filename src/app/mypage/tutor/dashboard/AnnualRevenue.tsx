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
import { Ilecture } from '@/types/lecture';
import { IOrderSaleList } from '@/types/mypage';

let chartData = [
  { month: '1월', revenue: 0 },
  { month: '2월', revenue: 0 },
  { month: '3월', revenue: 0 },
  { month: '4월', revenue: 0 },
  { month: '5월', revenue: 0 },
  { month: '6월', revenue: 0 },
  { month: '7월', revenue: 0 },
  { month: '8월', revenue: 0 },
  { month: '9월', revenue: 0 },
  { month: '10월', revenue: 0 },
  { month: '11월', revenue: 0 },
  { month: '12월', revenue: 0 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function AnnualRevenue({ orderItem }: { orderItem: IOrderSaleList[] }) {
  const nowYear = new Date().getFullYear().toString(); // 현재 년도
  let totalRevenue = 0;
  let totalQuantity = 0;

  const lectureData = orderItem
    .filter(item => item.createdAt.includes(nowYear)) //현재 년도만 추출
    .map(item => [item.createdAt, item.products[0].price]);

  console.log('lectureData', lectureData);

  for (let i = 0; i < lectureData.length; i++) {
    let month = Number((lectureData[i][0] as string).substring(5, 7));
    chartData[month - 1].revenue += lectureData[i][1] as number;
  }

  return (
    <Card className="mb-2 p-2 sm:p-0 sm:mb-0 sm:mt-10">
      {/* <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="quantity"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {nowYear} 년도 강의 수강 현황
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {nowYear} 년도에 수강한 강의 수를 확인할 수 있습니다.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
