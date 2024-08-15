'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

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

const chartData = [
  { month: '1월', lecture: 186 },
  { month: '2월', lecture: 305 },
  { month: '3월', lecture: 237 },
  { month: '4월', lecture: 73 },
  { month: '5월', lecture: 209 },
  { month: '6월', lecture: 214 },
  { month: '7월', lecture: 214 },
  { month: '8월', lecture: 214 },
  { month: '9월', lecture: 214 },
  { month: '10월', lecture: 214 },
  { month: '11월', lecture: 214 },
  { month: '12월', lecture: 214 },
];

const chartConfig = {
  lecture: {
    label: 'lecture',
    color: 'hsl(var(--chart-1))',
  },
  // mobile: {
  //   label: 'mobile',
  //   color: 'hsl(var(--chart-2))',
  // },
} satisfies ChartConfig;

export function AnnualRate({ item }: ILectureProps) {
  const nowYear = new Date().getFullYear(); // 현재 년도

  const products = item.flatMap(item => item.products);
  // const type = products.map(item => item.extra.type);
  // console.log(nowYear);
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
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
              // tickFormatter={value => value.slice(0, 3)}
              tickFormatter={value => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="lecture"
              type="natural"
              stroke="var(--color-lecture)"
              strokeWidth={3}
              dot={{
                fill: 'var(--color-lecture)',
              }}
              activeDot={{
                r: 6,
              }}
            >
              {/* <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              /> */}
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
