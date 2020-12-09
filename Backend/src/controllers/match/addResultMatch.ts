import { Request, Response } from 'express'
import PlayoffMatchService from '../../services/match/playoffMatch/playoffMatchService'
import { Controller } from '../protocols/IController'

export class PlayoffGetAddResultController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { match_id, score, winner_id } = request.body
    const match = new PlayoffMatchService()
    const result = await match.addResult(match_id, score, winner_id)
    return response.status(result.statusCode).json(result)
  }
}
