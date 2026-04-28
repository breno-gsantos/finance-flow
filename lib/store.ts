import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { Category, defaultCategories, mockTransactions, Transaction } from "./data";

interface FinanceStore{
    transactions: Transaction[]
    categories: Category[]
    addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void
    updateTransaction: (id: string, transaction: Partial<Transaction>) => void
    deleteTransaction: (id: string) => void
    addCategory: (category: Omit<Category, 'id'>) => void
    updateCategory: (id: string, category: Partial<Category>) => void
    deleteCategory: (id: string) => void
}

export const useFinanceStore = create<FinanceStore>()(
    persist(
    (set) => ({
      transactions: mockTransactions,
      categories: defaultCategories,
      
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        })),
      
      updateTransaction: (id, transaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...transaction } : t
          ),
        })),
      
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      
      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: crypto.randomUUID() },
          ],
        })),
      
      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c
          ),
        })),
      
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'finance-flow-storage',
    }
  )
)

export function useFinanceStats() {
  const { transactions, categories } = useFinanceStore()
  
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })
  
  const totalIncome = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const balance = totalIncome - totalExpenses
  
  const totalBalance = transactions.reduce((sum, t) => 
    t.type === 'income' ? sum + t.amount : sum - t.amount
  , 0)
  
  // Group expenses by category
  const expensesByCategory = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const category = categories.find((c) => c.id === t.categoryId)
      if (category) {
        acc[category.name] = (acc[category.name] || 0) + t.amount
      }
      return acc
    }, {} as Record<string, number>)
  
  // Monthly evolution data (last 6 months)
  const monthlyEvolution = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    const month = date.getMonth()
    const year = date.getFullYear()
    
    const monthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date)
      return tDate.getMonth() === month && tDate.getFullYear() === year
    })
    
    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      month: date.toLocaleDateString('pt-BR', { month: 'short' }),
      income,
      expenses,
      balance: income - expenses,
    }
  })
  
  return {
    totalIncome,
    totalExpenses,
    balance,
    totalBalance,
    expensesByCategory,
    monthlyEvolution,
    recentTransactions: transactions.slice(0, 8),
  }
}