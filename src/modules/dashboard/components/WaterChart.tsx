import { useMemo } from "react";
import { Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { formatChartDay, formatChartLabel } from "@/utils/time.utils";
import { formatMl } from "../utils";
import type { WaterOverTimeResponse } from "../types";

interface WaterChartProps {
  data: WaterOverTimeResponse | null;
  waterGoalMl: number;
}

/**
 * Calculate tick interval based on data length to prevent overcrowding
 * Shows approximately 7-10 labels max
 */
function getTickInterval(dataLength: number): number {
  if (dataLength <= 10) return 0; // Show all
  if (dataLength <= 20) return 1; // Every 2nd
  if (dataLength <= 40) return Math.floor(dataLength / 10) - 1; // ~10 labels
  if (dataLength <= 90) return Math.floor(dataLength / 7) - 1; // ~7 labels
  return Math.floor(dataLength / 6) - 1; // ~6 labels for very long ranges
}

const WaterChart = ({ data, waterGoalMl }: WaterChartProps) => {
  const chartData = useMemo(() => {
    if (!data?.waterOverTime?.length) return [];

    return data.waterOverTime.map((point) => ({
      label: formatChartDay(point.period),
      fullDate: formatChartLabel(point.period),
      water: point.waterMl,
      goal: waterGoalMl,
    }));
  }, [data, waterGoalMl]);

  const hasData = chartData.length > 0;
  const tickInterval = getTickInterval(chartData.length);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Droplets className="size-4 text-cyan-600" />
          Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        {hasData ? (
          <>
            <div className="h-[260px] w-full px-2 sm:px-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                    interval={tickInterval}
                    angle={chartData.length > 14 ? -45 : 0}
                    textAnchor={chartData.length > 14 ? "end" : "middle"}
                    height={chartData.length > 14 ? 50 : 30}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}L`}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "var(--radius)",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                    }}
                    formatter={(value: number | undefined) => [
                      formatMl(value ?? 0),
                      "Water",
                    ]}
                    labelFormatter={(
                      _: unknown,
                      payload: readonly { payload?: { fullDate?: string } }[]
                    ) => payload?.[0]?.payload?.fullDate ?? ""}
                  />
                  <ReferenceLine
                    y={waterGoalMl}
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Bar
                    dataKey="water"
                    fill="#06b6d4"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={chartData.length > 30 ? 20 : 40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded bg-cyan-500" />
                <span className="text-muted-foreground">Water</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-4 border-t-2 border-dashed border-amber-500" />
                <span className="text-muted-foreground">Daily Goal</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-[260px] items-center justify-center text-muted-foreground">
            No water data for this period
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WaterChart;
