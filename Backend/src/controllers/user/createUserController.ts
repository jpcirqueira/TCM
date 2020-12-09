/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express'
import { CreateUserFactory } from '../../services/factories/createUserFactory'
import { Controller } from '../protocols/IController'

export class CreateUserController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = new CreateUserFactory()
    const { statusCode, body } = await user.execute(request)
    return response.status(statusCode).json(body)
  }
}
