'use client'

import { useEffect, useMemo, useState } from "react";
import { CategoriesSkeleton } from "../skeletons/categories-skeleton";
import { Header } from "../header";
import { CategoryForm } from "./category-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CategoryCard } from "./category-card";
import { Category, Transaction } from "@/lib/generated/prisma/client";

interface Props{
    categories: Category[]
    transactions: Transaction[]
}

export function CategoriesClient({categories, transactions}: Props){
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const transactionCounts = useMemo(() => {
        return categories.reduce((acc, category) => {
            acc[category.id] = transactions.filter(
                (t) => t.categoryId === category.id
            ).length
             return acc
        }, {} as Record<string, number>)
    }, [transactions, categories])

    const incomeCategories = categories.filter((c) => c.type === "income")
    const expenseCategories = categories.filter((c) => c.type === "expense")

    if (!mounted) {
        return <CategoriesSkeleton />
    }

  return (
    <div className="flex flex-col flex-1 ">
      <Header title="Categorias" subtitle={`${categories.length} categorias cadastradas`} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Organize suas categorias personalizadas</p>
          <CategoryForm />
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="all">
              Todas ({categories.length})
            </TabsTrigger>
            <TabsTrigger value="income">
              Entradas ({incomeCategories.length})
            </TabsTrigger>
            <TabsTrigger value="expense">
              Despesas ({expenseCategories.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} transactionCount={transactionCounts[category.id] || 0} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="income" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {incomeCategories.map((category) => (
                <CategoryCard key={category.id} category={category} transactionCount={transactionCounts[category.id] || 0} />
              ))}
            </div>
            {incomeCategories.length === 0 && (
              <div className="flex h-50 flex-col items-center justify-center rounded-lg border border-dashed border-border">
                <p className="text-muted-foreground">
                  Nenhuma categoria de entrada
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="expense" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expenseCategories.map((category) => (
                <CategoryCard key={category.id} category={category} transactionCount={transactionCounts[category.id] || 0} />
              ))}
            </div>
            {expenseCategories.length === 0 && (
              <div className="flex h-50 flex-col items-center justify-center rounded-lg border border-dashed border-border">
                <p className="text-muted-foreground">
                  Nenhuma categoria de despesa
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}