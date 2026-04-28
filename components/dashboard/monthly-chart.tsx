'use client'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

interface MonthlyChartProps{
    data: {
        month: string
        income: number
        expenses: number
        balance: number
    }[]
}

const chartConfig = {
  income: {
    label: "Entradas",
    color: "var(--color-chart-1)",
  },
  expenses: {
    label: "Despesas",
    color: "var(--color-chart-4)",
  },
} satisfies ChartConfig

export function MonthlyChart({ data }: MonthlyChartProps){
    return(
        <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
                <CardTitle className="text-base font-semibold">Evolução Mensal</CardTitle>
                <CardDescription>Comparação de entradas e despesas dos últimos 6 meses</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig} className="h-75 w-full">
                    <AreaChart data={data}  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-chart-4)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                        <ChartTooltip cursor={{ stroke: 'var(--color-border)' }} content={<ChartTooltipContent indicator="line" />} />
                        <Area dataKey="income" type="monotone" fill="url(#fillIncome)" stroke="var(--color-chart-1)" strokeWidth={2} />
                        <Area dataKey="expenses" type="monotone" fill="url(#fillExpenses)" stroke="var(--color-chart-4)" strokeWidth={2} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}