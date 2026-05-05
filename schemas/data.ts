import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  type: z.enum(['income', 'expense']),
  icon: z.string().min(1, 'Selecione um ícone'),
  color: z.string().min(1, 'Selecione uma cor')
})

export type CategoryFormData = z.infer<typeof categorySchema>