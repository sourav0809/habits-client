import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PieChartIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Food } from "../../types";
import { getKcalPer100g } from "../../utils";

export interface ChartDensityPieProps {
  foods: Food[];
}

export function ChartDensityPie({ foods }: ChartDensityPieProps) {
  const low = foods.filter((f) => getKcalPer100g(f) < 100).length;
  const medium = foods.filter(
    (f) => getKcalPer100g(f) >= 100 && getKcalPer100g(f) <= 250
  ).length;
  const high = foods.filter((f) => getKcalPer100g(f) > 250).length;

  const data = [
    { name: "Low (<100)", value: low, color: "#10b981" },
    { name: "Medium (100–250)", value: medium, color: "#3b82f6" },
    { name: "High (>250)", value: high, color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <PieChartIcon className="size-4" />
          Calorie density (kcal/100g)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="h-[260px] w-full px-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                label={({ name, value }) =>
                  value > 0 ? `${name}: ${value}` : null
                }
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value: number | undefined, name) => [
                  `${value != null ? value : 0} meal(s)`,
                  name ?? "",
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
