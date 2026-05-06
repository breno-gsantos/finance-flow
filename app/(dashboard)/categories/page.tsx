import { CategoriesClient } from "@/components/categories/categories-client";
import prisma from "@/lib/db";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany()

  const transactions = await prisma.transaction.findMany()

  return (
    <CategoriesClient categories={categories} transactions={transactions} />
  )
}