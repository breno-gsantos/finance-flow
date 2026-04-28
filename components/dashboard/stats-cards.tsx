import { ArrowDownRight, ArrowUpRight, Icon, PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/data";

interface StatsCardsProps{
    totalBalance: number;
    totalIncome: number
    totalExpenses: number
    balance: number
}

export function StatsCards({balance, totalBalance, totalExpenses, totalIncome}: StatsCardsProps){
    const stats = [
        { title: "Saldo Total", value: totalBalance, icon: Wallet, trend: totalBalance >= 0 ? "up" : "down", description: "Saldo acumulado", color: "text-primary", bgColor: "bg-primary/10" },
        { title: "Entradas do Mês", value: totalIncome, icon: TrendingUp, trend: "up", description: "Total de receitas", color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
        { title: "Despesas do Mês", value: totalExpenses, icon: TrendingDown, trend: "down", description: "Total de gastos", color: "text-red-500", bgColor: "bg-red-500/10" },
        { title: "Saldo Restante", value: balance, icon: PiggyBank, trend: balance >= 0 ? "up" : "down", description: "Entradas - Despesas", color: balance >= 0 ? "text-emerald-500" : "text-red-500", bgColor: balance >= 0 ? "bg-emerald-500/10" : "bg-red-500/10" },
    ]

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({bgColor, color, description, icon: Icon, title, trend, value}) => (
                <Card key={title} className="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                            <div className={cn("rounded-lg p-2", bgColor)}>
                                <Icon className={cn("size-4", color)} />
                            </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className={cn("text-2xl font-bold", color)}>
                                {formatCurrency(value)}
                            </span>
                            {trend === "up" ? (
                                <ArrowUpRight className="size-4 text-emerald-500" />
                                ) : (
                                <ArrowDownRight className="size-4 text-red-500" />
                            )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}