/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express'
import SearchSolicitationService from '../../services/solicitation/searchSolicitationService'
import { Controller } from '../protocols/IController'

export class SearchSolitiationController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const solicitation = new SearchSolicitationService()
    const { statusCode, body } = await solicitation.execute(request)
    return response.status(statusCode).json(body)
  }
}
