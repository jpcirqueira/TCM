import { Request, Response } from 'express'
import CreateFriendlyMatchService from '../../services/match/createFriendlyMatchService'

import { Controller } from '../protocols/IController'

export default class CreateFriendlyMatchController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const create = new CreateFriendlyMatchService()
    const { body, statusCode } = await create.execute(request)
    return response.status(statusCode).json(body)
  }
}
