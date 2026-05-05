'use client'

import { Category } from "@/lib/data"
import { useFinanceStore } from "@/lib/store"
import { CategoryFormData, categorySchema } from "@/schemas/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

const ICON_OPTIONS = [
  "Wallet", "Laptop", "TrendingUp", "Plus", "Utensils", "Car", "Home", "Heart",
  "GraduationCap", "Gamepad2", "ShoppingBag", "Receipt", "CreditCard", "Plane",
  "Gift", "Coffee", "Smartphone", "Music", "Book", "Dumbbell"
]

const COLOR_OPTIONS = [
  "#10b981", "#3b82f6", "#8b5cf6", "#06b6d4", "#f97316", "#eab308",
  "#ef4444", "#ec4899", "#14b8a6", "#a855f7", "#f43f5e", "#6366f1"
]

interface CategoryFormProps {
  category?: Category
  onClose?: () => void
}

export function CategoryForm({ category, onClose }: CategoryFormProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(category?.name || "")
  const [icon, setIcon] = useState(category?.icon || "Wallet")
  const [color, setColor] = useState(category?.color || "#10b981")
  const [type, setType] = useState<"income" | "expense">(category?.type || "expense")

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      type: 'expense',
      color: '',
      icon: ''
    }
  })

  const { watch, handleSubmit, formState, control } = form

  const addCategory = useFinanceStore((state) => state.addCategory)
  const updateCategory = useFinanceStore((state) => state.updateCategory)

  async function onSubmit(values: CategoryFormData) {
    console.log(values);
  }

  const dialogContent = (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>
            {category ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
          <DialogDescription>
            {category ? 'Atualize as informações da categoria' : 'Cria uma nova categoria para organizar suas transações'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <FormField control={control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Alimentação, Transporte..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Button variant={field.value === 'income' ? 'default' : 'outline'} className={cn('flex-1', field.value === 'income' && 'bg-emerald-600')} onClick={() => setType('income')}>
                    Entrada
                  </Button>
                  <Button variant={type === 'expense' ? 'default' : 'outline'} className={cn('flex-1', type === 'expense' && 'bg-red-500 hover:bg-red-600')} onClick={() => setType('expense')}>
                    Saída
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="icon" render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um ícone' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ICON_OPTIONS.map((iconName) => (
                    <SelectItem key={iconName} value={iconName}>
                      {iconName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="color" render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {COLOR_OPTIONS.map((colorOption) => (
                    <button key={colorOption} type="button" onClick={() => field.onChange(colorOption)} className={cn('size-8 rounded-full transition-transform hover:scale-110', field.value === colorOption && 'ring-2 ring-white ring-offset-2 ring-offset-background')} style={{ backgroundColor: colorOption }} />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="mt-2 flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
            <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: `${color}20` }}>
              <span style={{ color }}>{icon.substring(0, 2)}</span>
            </div>
            <div>
              <p className="font-medium text-foreground">{name || 'Nome da categoria'}</p>
              <p className="text-xs text-muted-foreground">
                {type === 'income' ? 'Entrada' : 'Despesa'}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => {
            setOpen(false)
            onClose?.()
          }}>Cancelar
          </Button>
          <Button>
            {category ? 'Salvar' : 'Criar'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )

  if (category) {
    return dialogContent
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nova Categoria
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-106.25'>
        {dialogContent}
      </DialogContent>
    </Dialog>
  )
}