'use server'

import { formSchema } from "@/components/transactions/transaction-form"
import prisma from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";

export async function createTransaction(values: unknown){
    const validated = formSchema.safeParse(values);

    if(!validated.success){
        return {success: false, error: validated.error }
    }

    const {amount, ...data} = validated.data;

    try {
        await prisma.transaction.create({
            data: {
                ...data,
                amount: new Prisma.Decimal(amount)
            }
        })

        revalidatePath('/transactions')
        return {success: true}
    } catch (error) {
        return {success: false, error: 'Erro ao criar transação'}
    }
}