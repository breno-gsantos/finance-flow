'use client'

import { Category } from "@/lib/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale"
import { Calendar } from "../ui/calendar"


interface TransactionFormProps{
  categories: Category[]
}

export const formSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),

  amount: z
    .string()
    .min(1, "Valor é obrigatório")
    .refine((val) => !isNaN(parseFloat(val)), {message: "Valor inválido" }).refine((val) => parseFloat(val) > 0, {message: "Valor deve ser maior que 0" }),

  type: z.enum(["income", "expense"]),

  categoryId: z.string().min(1, "Selecione uma categoria"),

  date: z.date({
    error: "Selecione uma data",
  }),
})

type FormData = z.infer<typeof formSchema>

export function TransactionForm({ categories }: TransactionFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [categoryId, setCategoryId] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date())
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      categoryId: '',
      date: new Date(),
      description: '',
      type: 'expense'
    }
  })

  const { handleSubmit, control, formState } = form;

  async function onSubmit(values: FormData) {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
              <DialogDescription>Adicione uma nova entrada ou despesa</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">

              <FormField control={control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Salário..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={control} name="amount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0,00" step='0.01' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Button variant={field.value === 'income' ? 'default' : 'outline'} className={cn('flex-1', field.value === 'income' && 'bg-emerald-500')} onClick={() => field.onChange('income')}>
                        Entrada
                      </Button>
                      <Button variant={field.value === "expense" ? "default" : "outline"} className={cn("flex-1", field.value === "expense" && "bg-red-500" )} onClick={() => field.onChange("expense")}>
                        Saída
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={control} name="categoryId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.filter((c) => c.type === form.watch('type')).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={control} name="date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant='outline'>
                          <CalendarIcon className="mr-2 size-4" />
                          {field.value ? format(field.value, "PPP", {locale: ptBR}) : 'Selecione uma data'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )} />
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button>Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}