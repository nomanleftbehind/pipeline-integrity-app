import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getLoginSession } from './auth';

export const getUser = async (req: NextApiRequest, prisma: PrismaClient) => {

  const session = await getLoginSession(req);
  if (session) {
    return prisma.user.findUnique({ where: { id: session.id } });
  }
  return null;
};