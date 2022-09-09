import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';
import { getUser } from '../lib/user';
import { User as IUser } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export interface Context {
  prisma: PrismaClient;
  pubsub: RedisPubSub;
  req: NextApiRequest; // HTTP request carrying the `Authorization` header
  res: NextApiResponse;
  user: IUser | null;
}


// Context of subscription server, not the GraphQL operation context that's passed to resolvers.
// It doesn't contain req, res and user properties.
export interface ContextSubscription extends Pick<Context, 'prisma' | 'pubsub'> { };

interface ICreateContextProps {
  req: NextApiRequest;
  res: NextApiResponse;
}

export const pubsub = new RedisPubSub();

export async function createContext({ req, res }: ICreateContextProps): Promise<Context> {

  const user = await getUser(req, prisma);

  return { prisma, pubsub, req, res, user };
}