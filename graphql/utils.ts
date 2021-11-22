import { verify } from 'jsonwebtoken'
import { Context } from './context'

// export const APP_SECRET = 'appsecret3210blskilbl'
export const APP_SECRET = process.env.TOKEN_SECRET;

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const authHeader = context.req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET!) as Token
    
    return /*verifiedToken && Number(*/verifiedToken.userId/*)*/
  }
}
