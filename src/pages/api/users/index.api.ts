// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end() // 405: Method not allowed
	}

	const { name, username } = req.body

	const userExists = await Prisma.user.findUnique({
		where: {
			username,
		},
	})

	if (userExists) {
		return res.status(400).json({
			message: 'Username already taken.',
		})
	}

	const user = await Prisma.user.create({
		data: {
			name,
			username,
		},
	})

	return res.status(201).json(user)
}
