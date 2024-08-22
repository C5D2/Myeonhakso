'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Ilecture } from '@/types/lecture';

let chartConfig = {
  total: {
    label: 'total',
  },
} satisfies ChartConfig;

export default function LectureRevenue({ item }: { item: Ilecture[] }) {
  let chartData: object[] = [];
  const RevenueArray = item
    .filter(item => item.price * item.buyQuantity !== 0)
    .map(item => [item.price * item.buyQuantity, item.name, item._id]);

  RevenueArray.sort((a, b) => (b[0] as number) - (a[0] as number));
  let completeRevenue = [];
  let addEtc = 0;
  for (let i = 0; i < RevenueArray.length; i++) {
    if (i < 4) {
      completeRevenue.push(RevenueArray[i]);
    } else if (i >= 4) {
      addEtc += RevenueArray[i][0] as number;
    }
  }

  completeRevenue.push([addEtc, 'etc', 9999]);

  completeRevenue.forEach((item, index) => {
    chartConfig = {
      ...chartConfig,
      [item[2].toString()]: {
        label: item[1],
        color: `hsl(var(--chart-${index + 1}))`,
      },
    };

    chartData.push({
      lecture: item[2].toString(),
      total: item[0],
      fill: `var(--color-${item[2]})`,
    });
  });

  const totalRevenue = React.useMemo(() => {
    return chartData.reduce((acc, curr: any) => acc + curr.total, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[550px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="lecture"
              innerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRevenue.toLocaleString()}₩
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="lecture" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          현재까지 강의별 총 수익을 확인할 수 있습니다.
        </div>
        <div className="leading-none text-muted-foreground">
          상위 4개로 나누며 이외의 강의는 기타에 합산하여 보여집니다.
        </div>
      </CardFooter>
    </Card>
  );
}

// export default function LectureRevenue() {
//   return <div>LectureRevenue</div>;
// }
