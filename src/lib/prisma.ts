import { PrismaClient } from '@prisma/client'

export const Prisma = new PrismaClient({
	log: ['query'], // Mostra no terminal os logs de inserção e afins
})
