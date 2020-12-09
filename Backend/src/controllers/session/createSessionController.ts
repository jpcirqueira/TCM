import { Request, Response } from 'express'
import { SessionFactory } from '../../services/factories/sessionCreationFactory'
import { Controller } from '../protocols/IController'

export class CreateSessionController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const session = new SessionFactory()
    const { body, statusCode } = await session.execute(request)
    return response.status(statusCode).json(body)
  }
}
