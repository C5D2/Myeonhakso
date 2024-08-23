'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { IOrderSaleList } from '@/types/mypage';
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

export interface ILectureProps {
  item: IOrderSaleList[];
}

const chartConfig = {
  visitors: {
    label: '강의수',
  },
  tech: {
    label: 'IT',
    color: 'hsl(var(--chart-1))',
  },
  language: {
    label: '어학',
    color: 'hsl(var(--chart-2))',
  },
  hobby: {
    label: '취미',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function CategoryRate({ item }: ILectureProps) {
  const products = item.flatMap(item => item.products);
  const type = products.map(item => item.extra.type);

  const chartData = [
    {
      category: 'tech',
      visitors: type.filter(type => type === 'tech').length,
      fill: 'var(--color-tech)',
    },
    {
      category: 'language',
      visitors: type.filter(type => type === 'language').length,
      fill: 'var(--color-language)',
    },
    {
      category: 'hobby',
      visitors: type.filter(type => type === 'hobby').length,
      fill: 'var(--color-hobby)',
    },
    // { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    // { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
  ];

  return (
    <Card className="p-3 sm:mb-10">
      {/* <CardHeader>
        <CardTitle>Bar Chart - Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              // activeBar={({ ...props }) => {
              //   return (
              //     <Rectangle
              //       {...props}
              //       fillOpacity={0.8}
              //       stroke={props.payload.fill}
              //       strokeDasharray={4}
              //       strokeDashoffset={4}
              //     />
              //   );
              // }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm sm:text-xs">
        <div className="leading-none text-muted-foreground">
          현재까지 수강한 카테고리별 강의 수를 확인할 수 있습니다.
        </div>
      </CardFooter>
    </Card>
  );
}
// import { Ilecture } from '@/types/lecture';
// import { IOrderSaleList } from '@/types/mypage';

// interface ILectureProps {
//   item: IOrderSaleList[];
// }

// function CategoryRate({ item }: ILectureProps) {
//   const products = item.flatMap(item => item.products);
//   const type = products.map(item => item.extra.type);
//   console.log(type); // 타입 추출 완료

//   return <div>CategoryRate</div>;
// }

// export default CategoryRate;
