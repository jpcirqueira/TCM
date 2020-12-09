import { Request, Response } from 'express'
import { SearchTournamentsService } from '../../services/tournaments/searchTournamentService'
import { Controller } from '../protocols/IController'

export class SearchTournamentController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const tournament = new SearchTournamentsService()
    const { body, statusCode } = await tournament.execute(request)
    return response.status(statusCode).json(body)
  }
}
