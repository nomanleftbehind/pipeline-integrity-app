import Iron from '@hapi/iron';
import { AuthenticationError } from 'apollo-server-errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { User as IUser } from '@prisma/client';
import { getTokenCookie, MAX_AGE, setTokenCookie } from './auth-cookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET!;

export const setLoginSession = async (res: NextApiResponse, session: IUser) => {
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt: Date.now(), maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
};

export const getLoginSession = async (req: NextApiRequest) => {
  
  const token = getTokenCookie(req);
  if (!token) return null;
  
  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;
  console.log('getLoginSession session:', session);
  
  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new AuthenticationError('Session expired');
  }
  
  return session;
};