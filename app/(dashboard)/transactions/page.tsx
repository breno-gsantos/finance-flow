import { TransactionsClient } from "@/components/transactions/transactions-client"
import prisma from "@/lib/db"

export default async function TransactionsPage(){
    const transactions = await prisma.transaction.findMany({
        orderBy: {date: 'asc'}
    })

    const categories = await prisma.category.findMany()

    const parsedTransactions = transactions.map((t) => ({
        id: t.id,
        description: t.description,
        amount: t.amount.toNumber(),
        type: t.type,
        categoryId: t.categoryId,
        date: t.date.toISOString(),
        createdAt: t.createdAt.toISOString()
    }))

    return (
        <TransactionsClient
            transactions={parsedTransactions}
            categories={categories}
        />
    )
}