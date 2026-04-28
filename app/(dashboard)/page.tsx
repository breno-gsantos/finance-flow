'use client'

import { ExpensesChart } from "@/components/dashboard/expenses-chart";
import { MonthlyChart } from "@/components/dashboard/monthly-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Header } from "@/components/header";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { useFinanceStats, useFinanceStore } from "@/lib/store";
import { useEffect, useState } from "react"

export default function DashboardPage(){
    const [mounted, setMounted] = useState<boolean>(false);
    const { categories } = useFinanceStore();
    const stats = useFinanceStats();

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted){
        return <DashboardSkeleton />
    }

    const currentMonth = new Date().toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    })

    return(
        <div className="flex-1 flex flex-col">
            <Header title="Dashboard" subtitle={`Visão Geral de ${currentMonth}`} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                <StatsCards totalBalance={stats.totalBalance} totalIncome={stats.totalIncome} totalExpenses={stats.totalExpenses} balance={stats.balance} />

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <MonthlyChart data={stats.monthlyEvolution} />
                    </div>
                    <ExpensesChart data={stats.expensesByCategory} />
                </div>

                <div className="mt-6">
                    <RecentTransactions transactions={stats.recentTransactions} categories={categories} />
                </div>
            </main>
        </div>
    )
}