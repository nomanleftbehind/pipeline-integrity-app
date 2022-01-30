import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

export interface Context {
  prisma: PrismaClient;
  req: NextApiRequest // HTTP request carrying the `Authorization` header
}

export function createContext(req: NextApiRequest) {

  return {
    ...req,
    prisma,
  }
}