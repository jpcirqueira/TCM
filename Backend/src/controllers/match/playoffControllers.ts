import { Request, Response } from 'express'
import PlayoffMatchService from '../../services/match/playoffMatch/playoffMatchService'
import { Controller } from '../protocols/IController'

export class PlayoffAddStatusController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { match_id, status } = request.body
    const match = new PlayoffMatchService()
    const result = await match.setState(match_id, status)
    return response.status(result.statusCode).json(result)
  }
}
