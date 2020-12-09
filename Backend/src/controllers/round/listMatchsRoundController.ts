/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express'
import { Controller } from '../protocols/IController'
import { ListMatchsInRoundService } from '../../services/round/listMatchsRoundService'

export class ListMatchsRoundController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const list = new ListMatchsInRoundService()
    const { id } = request.params
    const { body, statusCode } = await list.execute(id)
    return response.status(statusCode).json(body)
  }
}
