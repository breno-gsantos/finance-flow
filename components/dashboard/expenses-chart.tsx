'use client'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart } from "recharts"
import { formatCurrency } from "@/lib/data"

interface ExpensesChartProps {
  data: Record<string, number>
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)", 
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "#f97316",
  "#8b5cf6",
  "#06b6d4",
]

export function ExpensesChart({ data }: ExpensesChartProps){
    const chartData = Object.entries(data)
        .map(([name, value], index) => ({
        name,
        value,
        fill: COLORS[index % COLORS.length],
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)

    const chartConfig = chartData.reduce((acc, item) => {
        acc[item.name] = {
            label: item.name,
            color: item.fill,
        }
        return acc
    }, {} as ChartConfig)

    const total = chartData.reduce((sum, item) => sum + item.value, 0)

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
                <CardTitle className="text-base font-semibold">Despesas por Categoria</CardTitle>
                <CardDescription>Distribuição de gastos do mês atual</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto h-75 w-full">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                    {chartData.slice(0, 4).map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full" style={{ backgroundColor: item.fill }} />
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{formatCurrency(item.value)}</span>
                                <span className="text-xs text-muted-foreground">
                                     ({((item.value / total) * 100).toFixed(0)}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}