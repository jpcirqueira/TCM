/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express'
import { Controller } from '../protocols/IController'
import { CreateRoundService } from '../../services/round/createRoundService'

export class CreateRoundController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const create = new CreateRoundService()
    const { name, status, participant_list } = request.body
    const { body, statusCode } = await create.execute(
      name,
      status,
      participant_list,
    )
    return response.status(statusCode).json(body)
  }
}
