import { Request, Response } from 'express'
import { SearchUserFactory } from '../../services/factories/seacrhUserFactory'
import { Controller } from '../protocols/IController'

export class SearchUserController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = new SearchUserFactory()
    const { statusCode, body } = await user.execute(request)
    return response.status(statusCode).json(body)
  }
}
