import { Request, Response } from 'express'
import PlayoffMatchService from '../../services/match/playoffMatch/playoffMatchService'
import { Controller } from '../protocols/IController'

export class PlayoffGetMatchController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const match = new PlayoffMatchService()
    const result = await match.getMatch(id)
    return response.status(Number(result.statusCode)).json(result)
  }
}
