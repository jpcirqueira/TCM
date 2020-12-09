/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express'
import CreateSolicitationService from '../../services/solicitation/createSolitiationService'
import { Controller } from '../protocols/IController'

export class CreateSolitiationController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const solicitation = new CreateSolicitationService()
    const { statusCode, body } = await solicitation.execute(request)
    return response.status(statusCode).json(body)
  }
}
