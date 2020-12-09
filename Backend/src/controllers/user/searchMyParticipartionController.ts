import { Request, Response } from 'express'
import { Controller } from '../protocols/IController'
import SearchAcceptedSolicitationService from '../../services/user/searchAcceptedSolicitationService'

export class SearchMyParticipartionController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const search = new SearchAcceptedSolicitationService()
    const { statusCode, body } = await search.execute(request)
    return response.status(statusCode).json(body)
  }
}
