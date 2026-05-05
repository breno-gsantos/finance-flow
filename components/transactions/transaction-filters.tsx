'use client'

import { Category } from "@/lib/data"
import { CalendarIcon, Filter, X } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

interface TransactionFiltersProps{
  categories: Category[]
  selectedType: string | null
  selectedCategory: string | null
  dateRange: DateRange | undefined
  onTypeChange: (type: string | null) => void
  onCategoryChange: (categoryId: string | null) => void
  onDateRangeChange: (range: DateRange | undefined) => void
  onClearFilters: () => void
}

export function TransactionFilters({categories, dateRange, onCategoryChange, onClearFilters, onDateRangeChange, onTypeChange, selectedCategory, selectedType}: TransactionFiltersProps) {
  const hasFilters = selectedType || selectedCategory || dateRange
 
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="size-4" />
        <span className="hidden sm:inline">Filtros:</span>
      </div>
      <Select value={selectedType || 'all'} onValueChange={(value) => onTypeChange(value === 'all' ? null : value)}>
        <SelectTrigger className="w-32.5">
          <SelectValue placeholder='Tipo' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="income">Entradas</SelectItem>
          <SelectItem value="expense">Despesas</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedCategory || "all"} onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className={cn('w-60 justify-start text-left font-normal', !dateRange && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 size-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yy", { locale: ptBR })} -{" "}
                  {format(dateRange.to, "dd/MM/yy", { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, "PPP", { locale: ptBR })
              )
            ) : (
              "Período"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={onDateRangeChange} numberOfMonths={2} />
        </PopoverContent>
      </Popover>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-9 px-2">
          <X className="mr-1 size-4" />
          Limpar
        </Button>
      )}

      {hasFilters && (
        <div className="flex items-center gap-1">
          {selectedType && (
            <Badge variant="secondary" className="text-xs">
              {selectedType === "income" ? "Entradas" : "Despesas"}
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="text-xs">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </Badge>
          )}
          {dateRange?.from && (
            <Badge variant="secondary" className="text-xs">
              {format(dateRange.from, "dd/MM", { locale: ptBR })}
              {dateRange.to && ` - ${format(dateRange.to, "dd/MM", { locale: ptBR })}`}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}