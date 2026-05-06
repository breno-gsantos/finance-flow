import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  type: z.enum(['income', 'expense']),
  icon: z.enum([
  "Wallet", "Laptop", "TrendingUp", "Plus", "Utensils",
  "Car", "Home", "Heart", "GraduationCap", "Gamepad2",
  "ShoppingBag", "Receipt", "CreditCard", "Plane",
  "Gift", "Coffee", "Smartphone", "Music", "Book", "Dumbbell"
]),
  color: z.string().min(1, 'Selecione uma cor')
})

export type CategoryFormData = z.infer<typeof categorySchema>