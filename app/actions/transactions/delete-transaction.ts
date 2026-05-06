'use server'

import prisma from "@/lib/db"

export async function deleteTransaction(id: string){
    await prisma.transaction.delete({
        where: {id}
    })
}