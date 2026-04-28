export interface Category {
  id: string
  name: string
  icon: string
  color: string
  type: 'income' | 'expense'
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  categoryId: string
  date: string
  createdAt: string
}

export const defaultCategories: Category[] = [
  { id: '1', name: 'Salário', icon: 'Wallet', color: '#10b981', type: 'income' },
  { id: '2', name: 'Freelance', icon: 'Laptop', color: '#3b82f6', type: 'income' },
  { id: '3', name: 'Investimentos', icon: 'TrendingUp', color: '#8b5cf6', type: 'income' },
  { id: '4', name: 'Outros Ganhos', icon: 'Plus', color: '#06b6d4', type: 'income' },
  { id: '5', name: 'Alimentação', icon: 'Utensils', color: '#f97316', type: 'expense' },
  { id: '6', name: 'Transporte', icon: 'Car', color: '#eab308', type: 'expense' },
  { id: '7', name: 'Moradia', icon: 'Home', color: '#ef4444', type: 'expense' },
  { id: '8', name: 'Saúde', icon: 'Heart', color: '#ec4899', type: 'expense' },
  { id: '9', name: 'Educação', icon: 'GraduationCap', color: '#14b8a6', type: 'expense' },
  { id: '10', name: 'Lazer', icon: 'Gamepad2', color: '#a855f7', type: 'expense' },
  { id: '11', name: 'Compras', icon: 'ShoppingBag', color: '#f43f5e', type: 'expense' },
  { id: '12', name: 'Contas', icon: 'Receipt', color: '#6366f1', type: 'expense' },
]

export const mockTransactions: Transaction[] = [
  // Janeiro 2024
  { id: '1', description: 'Salário Janeiro', amount: 8500, type: 'income', categoryId: '1', date: '2024-01-05', createdAt: '2024-01-05T10:00:00Z' },
  { id: '2', description: 'Aluguel', amount: 2200, type: 'expense', categoryId: '7', date: '2024-01-10', createdAt: '2024-01-10T10:00:00Z' },
  { id: '3', description: 'Supermercado Carrefour', amount: 456.78, type: 'expense', categoryId: '5', date: '2024-01-12', createdAt: '2024-01-12T14:30:00Z' },
  { id: '4', description: 'Academia Smart Fit', amount: 99.90, type: 'expense', categoryId: '8', date: '2024-01-15', createdAt: '2024-01-15T09:00:00Z' },
  { id: '5', description: 'Projeto Freelance XYZ', amount: 2500, type: 'income', categoryId: '2', date: '2024-01-18', createdAt: '2024-01-18T16:00:00Z' },
  { id: '6', description: 'Conta de Luz', amount: 187.50, type: 'expense', categoryId: '12', date: '2024-01-20', createdAt: '2024-01-20T11:00:00Z' },
  { id: '7', description: 'Uber Mensal', amount: 320, type: 'expense', categoryId: '6', date: '2024-01-22', createdAt: '2024-01-22T18:00:00Z' },
  
  // Fevereiro 2024
  { id: '8', description: 'Salário Fevereiro', amount: 8500, type: 'income', categoryId: '1', date: '2024-02-05', createdAt: '2024-02-05T10:00:00Z' },
  { id: '9', description: 'Aluguel', amount: 2200, type: 'expense', categoryId: '7', date: '2024-02-10', createdAt: '2024-02-10T10:00:00Z' },
  { id: '10', description: 'Restaurante Outback', amount: 189.90, type: 'expense', categoryId: '5', date: '2024-02-14', createdAt: '2024-02-14T20:00:00Z' },
  { id: '11', description: 'Netflix + Spotify', amount: 65.80, type: 'expense', categoryId: '10', date: '2024-02-15', createdAt: '2024-02-15T08:00:00Z' },
  { id: '12', description: 'Curso Udemy', amount: 27.90, type: 'expense', categoryId: '9', date: '2024-02-18', createdAt: '2024-02-18T15:00:00Z' },
  { id: '13', description: 'Dividendos Ações', amount: 450, type: 'income', categoryId: '3', date: '2024-02-20', createdAt: '2024-02-20T10:00:00Z' },
  { id: '14', description: 'Gasolina', amount: 280, type: 'expense', categoryId: '6', date: '2024-02-22', createdAt: '2024-02-22T17:00:00Z' },
  
  // Março 2024
  { id: '15', description: 'Salário Março', amount: 8500, type: 'income', categoryId: '1', date: '2024-03-05', createdAt: '2024-03-05T10:00:00Z' },
  { id: '16', description: 'Aluguel', amount: 2200, type: 'expense', categoryId: '7', date: '2024-03-10', createdAt: '2024-03-10T10:00:00Z' },
  { id: '17', description: 'Supermercado Pão de Açúcar', amount: 523.45, type: 'expense', categoryId: '5', date: '2024-03-12', createdAt: '2024-03-12T16:00:00Z' },
  { id: '18', description: 'Consulta Médica', amount: 350, type: 'expense', categoryId: '8', date: '2024-03-15', createdAt: '2024-03-15T14:00:00Z' },
  { id: '19', description: 'Projeto Freelance ABC', amount: 3200, type: 'income', categoryId: '2', date: '2024-03-18', createdAt: '2024-03-18T11:00:00Z' },
  { id: '20', description: 'Shopping - Roupas', amount: 489.90, type: 'expense', categoryId: '11', date: '2024-03-20', createdAt: '2024-03-20T15:00:00Z' },
  { id: '21', description: 'Conta de Água', amount: 95.30, type: 'expense', categoryId: '12', date: '2024-03-22', createdAt: '2024-03-22T09:00:00Z' },
  { id: '22', description: 'Internet Fibra', amount: 119.90, type: 'expense', categoryId: '12', date: '2024-03-25', createdAt: '2024-03-25T10:00:00Z' },
  
  // Abril 2024 (mês atual)
  { id: '23', description: 'Salário Abril', amount: 9200, type: 'income', categoryId: '1', date: '2024-04-05', createdAt: '2024-04-05T10:00:00Z' },
  { id: '24', description: 'Bônus Trimestral', amount: 3500, type: 'income', categoryId: '4', date: '2024-04-05', createdAt: '2024-04-05T10:30:00Z' },
  { id: '25', description: 'Aluguel', amount: 2200, type: 'expense', categoryId: '7', date: '2024-04-10', createdAt: '2024-04-10T10:00:00Z' },
  { id: '26', description: 'iFood Mensal', amount: 387.60, type: 'expense', categoryId: '5', date: '2024-04-12', createdAt: '2024-04-12T21:00:00Z' },
  { id: '27', description: 'Academia Smart Fit', amount: 99.90, type: 'expense', categoryId: '8', date: '2024-04-15', createdAt: '2024-04-15T09:00:00Z' },
  { id: '28', description: 'Gasolina Shell', amount: 310, type: 'expense', categoryId: '6', date: '2024-04-16', createdAt: '2024-04-16T18:00:00Z' },
  { id: '29', description: 'Cinema + Pipoca', amount: 89.90, type: 'expense', categoryId: '10', date: '2024-04-18', createdAt: '2024-04-18T20:00:00Z' },
  { id: '30', description: 'Conta de Luz', amount: 203.40, type: 'expense', categoryId: '12', date: '2024-04-20', createdAt: '2024-04-20T11:00:00Z' },
  { id: '31', description: 'Supermercado Extra', amount: 445.20, type: 'expense', categoryId: '5', date: '2024-04-22', createdAt: '2024-04-22T17:00:00Z' },
  { id: '32', description: 'Farmácia Droga Raia', amount: 156.80, type: 'expense', categoryId: '8', date: '2024-04-23', createdAt: '2024-04-23T12:00:00Z' },
  { id: '33', description: 'Livros Amazon', amount: 127.90, type: 'expense', categoryId: '9', date: '2024-04-24', createdAt: '2024-04-24T15:00:00Z' },
  { id: '34', description: 'Projeto Freelance DEF', amount: 1800, type: 'income', categoryId: '2', date: '2024-04-25', createdAt: '2024-04-25T14:00:00Z' },
  { id: '35', description: 'Rendimento Poupança', amount: 85.50, type: 'income', categoryId: '3', date: '2024-04-26', createdAt: '2024-04-26T08:00:00Z' },
]

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}
