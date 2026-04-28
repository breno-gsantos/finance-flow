'use client'

import { Category, formatCurrency, formatDateShort, Transaction } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

interface RecentTransactionsProps{
    transactions: Transaction[]
    categories: Category[]
}

export function RecentTransactions({ categories, transactions }: RecentTransactionsProps){
    function getCategory(categoryId: string){
        return categories.find((c) => c.id === categoryId)
    }

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
                <CardTitle className="text-base font-semibold">Últimas Transações</CardTitle>
                <CardDescription>Movimentações mais recentes da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-100">
                    <div className="space-y-1 px-6 pb-6">
                        {transactions.map((transaction) => {
                            const category = getCategory(transaction.categoryId)

                            return (
                                <div key={transaction.id} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent/50">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", transaction.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10" )}>
                                            {transaction.type === "income" ? (
                                                <ArrowUpRight className="size-5 text-emerald-500" />
                                                ) : (
                                                <ArrowDownRight className="size-5 text-red-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {category?.name} • {formatDateShort(transaction.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={cn("text-sm font-semibold", transaction.type === "income" ? "text-emerald-500" : "text-red-500")}>
                                        {transaction.type === "income" ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}