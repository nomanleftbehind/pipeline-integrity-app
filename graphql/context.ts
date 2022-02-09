import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';
import { getUser } from "../lib/user";
import { User as IUser } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  req: NextApiRequest; // HTTP request carrying the `Authorization` header
  res: NextApiResponse;
  user: IUser | null;
}

interface ICreateContextProps {
  req: NextApiRequest;
  res: NextApiResponse;
}

export async function createContext({ req, res }: ICreateContextProps): Promise<Context> {

  const user = await getUser(req, prisma);

  return { prisma, req, res, user };
}