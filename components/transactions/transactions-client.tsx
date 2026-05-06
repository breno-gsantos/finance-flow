'use client'

import { Category } from "@/lib/generated/prisma/client"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { DateRange } from "react-day-picker"
import { TransactionsSkeleton } from "../skeletons/transactions-skeleton"
import { Header } from "../header"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/data"
import { TransactionForm } from "./transaction-form"
import { TransactionFilters } from "./transaction-filters"
import { TransactionTable } from "./transaction-table"

type Transaction = {
    id: string
    description: string
    amount: number
    type: 'income' | 'expense'
    categoryId: string
    date: string
    createdAt: string
}

interface Props {
    transactions: Transaction[]
    categories: Category[]
}

export function TransactionsClient({transactions, categories}: Props){
    const [mounted, setMounted] = useState<boolean>(false)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

    useEffect(() => {
        setMounted(true)
    }, [])

    const filteredTransactions = useMemo(() => {
        return transactions
        .filter((t) => {
            if (selectedType && t.type !== selectedType) return false
            if (selectedCategory && t.categoryId !== selectedCategory) return false

            if (dateRange?.from) {
                const transactionDate = new Date(t.date)
                if (transactionDate < dateRange.from) return false
                if (dateRange.to && transactionDate > dateRange.to) return false
            }
            return true
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [transactions, selectedType, selectedCategory, dateRange])

    const totals = useMemo(() => {
        const income = filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0)

    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
        return { income, expense }
    }, [filteredTransactions])

    const clearFilters = () => {
        setSelectedType(null)
        setSelectedCategory(null)
        setDateRange(undefined)
    }

    const cards = [
        { label: 'Entradas', value: totals.income, color: "text-emerald-500", icon: ArrowUpRight },
        { label: 'Despesas', value: totals.expense, color: "text-red-500", icon: ArrowDownRight }
]

  if (!mounted) {
    return <TransactionsSkeleton />
  }

    return(
        <div className="flex-1 flex flex-col">
            <Header title="Transações" subtitle={`${filteredTransactions.length} transações encontradas`} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        {cards.map(({color, icon: Icon, label, value }) => (
                            <Card key={label} className="border-border/50 bg-card/50">
                                <CardContent className="flex items-center gap-2 px-4 py-2">
                                    <Icon className={`size-4 text-${color}`} />
                                    <span className="text-sm text-muted-foreground">{label}:</span>
                                    <span className={`font-semibold ${color}`}>{formatCurrency(value)}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <TransactionForm categories={categories} />
                </div>

                <div className="mt-4">
                    <TransactionFilters
                        categories={categories}
                        selectedType={selectedType}
                        selectedCategory={selectedCategory}
                        dateRange={dateRange}
                        onTypeChange={setSelectedType}
                        onCategoryChange={setSelectedCategory}
                        onDateRangeChange={setDateRange}
                        onClearFilters={clearFilters}
                    />
                </div>

                <div className="mt-6">
                    <TransactionTable transactions={filteredTransactions} categories={categories} />
                </div>
            </main>
        </div>
    )
}