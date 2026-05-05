'use client'

import { Category, formatCurrency, formatDate, Transaction } from "@/lib/data"
import { useFinanceStore } from "@/lib/store"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

interface TransactionTableProps{
  transactions: Transaction[]
  categories: Category[]
}

export function TransactionTable({ categories, transactions }: TransactionTableProps) {
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction)

  const getCategory = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)

  const handleDelete = (id: string) => {
    deleteTransaction(id)
    toast.success("Transação removida com sucesso!")
  }

  if (transactions.length === 0) {
    return (
      <div className="flex h-100 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50">
        <p className="text-muted-foreground">Nenhuma transação encontrada</p>
        <p className="text-sm text-muted-foreground">
          Adicione uma nova transação para começar
        </p>
      </div>
    )
  }
  
  return (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-2xl">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[40%]">Descrição</TableHead>
            <TableHead className="hidden sm:table-cell">Categoria</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-12.5"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const category = getCategory(transaction.categoryId)

            return (
              <TableRow key={transaction.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={cn('flex size-9 items-center justify-center rounded-full', transaction.type === 'income' ? 'bg-emerald-500/10' : 'bg-red-500/10')}>
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {category?.name} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="font-normal" style={{ backgroundColor: `${category?.color}20`, color: category?.color }}>
                    {category?.name}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className="text-right">
                  <span className={cn("font-semibold", transaction.type === "income" ? "text-emerald-500" : "text-red-500" )}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Pencil className="size-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(transaction.id)}>
                        <Trash2 className="size-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}