import { Prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const username = String(req.query.username);
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not specified.' });
  }

  const user = await Prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' });
  }

  const availableWeekDays = await Prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  });

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    );
  });

  const blockedDatesRaw = await Prisma.$queryRaw<{ date: Date }[]>`
    SELECT *
    FROM 
      schedulings
    WHERE schedulings.user_id = ${user.id} 
      AND DATE_FORMAT(schedulings.date, "%Y-%m") = ${`${year}-${month}`}
      
  `;

  const blockedDates = blockedDatesRaw.map((blockedDate) => {
    return dayjs(blockedDate.date).get('date');
  });

  return res.json({
    blockedWeekDays,
    blockedDatesRaw,
  });
}
