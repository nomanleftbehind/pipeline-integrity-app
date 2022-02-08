import { verify } from 'jsonwebtoken';
import { Context } from './context';

export const APP_SECRET = process.env.TOKEN_SECRET;

interface Token {
  userId: string
}

export function getUserId(ctx: Context) {
  if (ctx.req.cookies.userId) {
    return ctx.req.cookies.userId;
  }

  

  throw new AuthError();


  // const authHeader = ctx.req.headers.authorization;

  // if (authHeader) {
  //   const token = authHeader.replace('Bearer ', '')
  //   const verifiedToken = verify(token, APP_SECRET!) as Token

  //   return verifiedToken.userId;
  // }
}

export class AuthError extends Error {
  constructor() {
    super("Not Authorized");
  }
}