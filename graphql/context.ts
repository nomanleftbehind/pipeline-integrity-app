import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';

export interface Context {
  prisma: PrismaClient
  req: any // HTTP request carrying the `Authorization` header
}

export function createContext(req: any) {
  return {
    ...req,
    prisma,
  }
}