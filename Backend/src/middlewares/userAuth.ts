import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '../errors/appError'

interface Token {
  header: string
  payload: string
  sub: string
}

export default function userAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  try {
    const header = request.headers.authorization

    if (!header) {
      throw new AppError('Token não enviado', 401)
    }
    const [, token] = header.split(' ')
    const checkToken = verify(token, 'f295eb52d82423b1621a837193c98471')

    const { sub } = checkToken as Token

    request.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('JWT Inválido', 401)
  }
}
