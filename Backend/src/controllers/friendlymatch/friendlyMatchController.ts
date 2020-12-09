import { Request, Response } from 'express'
import FriendlyMatchService from '../../services/match/friendlyMatch/friendlyMatchService'
import { Controller } from '../protocols/IController'

export class FriendlyAddStatusController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { match_id, status } = request.body
    const match = new FriendlyMatchService()
    const result = await match.setState(match_id, status)
    return response.status(result.statusCode).json(result)
  }
}
