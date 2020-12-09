/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'

export interface Result {
  body: any
  statusCode: number
}

export interface Service {
  execute(request: Request): Promise<Result>
}
