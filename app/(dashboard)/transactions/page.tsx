'use client'

import { Header } from "@/components/header"
import { TransactionsSkeleton } from "@/components/skeletons/transactions-skeleton"
import { useFinanceStore } from "@/lib/store"
import { useEffect, useMemo, useState } from "react"
import { DateRange } from "react-day-picker"

export default function TransactionsPage(){
    const [mounted, setMounted] = useState<boolean>(false)
    const { transactions, categories } = useFinanceStore()
  
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

  if (!mounted) {
    return <TransactionsSkeleton />
  }

    return(
        <div className="flex-1 flex flex-col">
            <Header title="Transações" subtitle={`${filteredTransactions.length} transações encontradas`} />
        </div>
    )
}