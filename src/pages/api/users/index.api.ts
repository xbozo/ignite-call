// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // 405: Method not allowed
  }

  const { name, username } = req.body;

  const userExists = await Prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    return res.status(400).json({
      message: 'Username already taken.',
    });
  }

  const user = await Prisma.user.create({
    data: {
      name,
      username,
    },
  });

  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return res.status(201).json(user);
}
