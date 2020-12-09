import { Request, Response } from 'express'
import FriendlyMatchService from '../../services/match/friendlyMatch/friendlyMatchService'
import { Controller } from '../protocols/IController'

export class FriendlyAddResultController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { match_id, score, winner_id } = request.body
    const match = new FriendlyMatchService()
    const result = await match.addResult(match_id, score, winner_id)
    return response.status(result.statusCode).json(result)
  }
}
