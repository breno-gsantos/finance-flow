'use client'

import { Category } from "@/lib/data"
import { useFinanceStore } from "@/lib/store";
import { Book, Car, Coffee, CreditCard, Dumbbell, Gamepad2, Gift, GraduationCap, Heart, Home, Laptop, LucideIcon, MoreHorizontal, Music, Pencil, Plane, Plus, Receipt, ShoppingBag, Smartphone, Trash2, TrendingUp, Utensils, Wallet } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CategoryForm } from "./category-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const iconMap: Record<string, LucideIcon> = {
  Wallet, Laptop, TrendingUp, Plus, Utensils, Car, Home, Heart,
  GraduationCap, Gamepad2, ShoppingBag, Receipt, CreditCard, Plane,
  Gift, Coffee, Smartphone, Music, Book, Dumbbell
}

interface CategoryCardProps{
  category: Category;
  transactionCount: number;
}

export function CategoryCard({category, transactionCount }: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  
  const deleteCategory = useFinanceStore((state) => state.deleteCategory)
  
  const IconComponent = iconMap[category.icon] || Wallet

  const handleDelete = () => {
    deleteCategory(category.id)
    toast.success("Categoria removida com sucesso!")
    setShowDeleteAlert(false)
  }

  return (
    <>
      <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-border hover:bg-card/80">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-105" style={{ backgroundColor: `${category.color}20` }}>
                <IconComponent className="size-6" style={{ color: category.color }} />  
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {transactionCount} {transactionCount === 1 ? 'transação' : 'transações'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={cn("text-xs font-normal", category.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500" )}>
                {category.type === "income" ? "Entrada" : "Saída"}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Ações</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2" onClick={() => setIsEditing(true)}>
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive" onClick={() => setShowDeleteAlert(true)}>
                    <Trash2 className="size-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-106.25">
          <CategoryForm category={category} onClose={() => setIsEditing(false)} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. As transações associadas a esta
              categoria não serão excluídas, mas ficarão sem categoria.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}