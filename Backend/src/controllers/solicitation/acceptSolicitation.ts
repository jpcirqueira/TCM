/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express'
import AcceptSolicitationService from '../../services/solicitation/acceptSolicitationService'
import { Controller } from '../protocols/IController'

export class AcceptSolitiationController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const solicitation = new AcceptSolicitationService()
    const { statusCode, body } = await solicitation.execute(request)
    return response.status(statusCode).json(body)
  }
}
