import { Request, Response } from 'express'
import FriendlyMatchService from '../../services/match/friendlyMatch/friendlyMatchService'
import { Controller } from '../protocols/IController'

export class FriendlyGetMatchController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const match = new FriendlyMatchService()
    const result = await match.getMatch(id)
    return response.status(Number(result.statusCode)).json(result)
  }
}
