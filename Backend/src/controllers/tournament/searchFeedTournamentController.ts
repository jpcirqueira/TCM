import { Request, Response } from 'express'
import { FeedAllTournamentsService } from '../../services/tournaments/FeedAllTornaments'
import { Controller } from '../protocols/IController'

export class SearchFeedTournamentController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const tournament = new FeedAllTournamentsService()
    const { body, statusCode } = await tournament.execute(request)
    return response.status(statusCode).json(body)
  }
}
