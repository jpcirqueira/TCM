import { Request, Response } from 'express'
import SearchParticipantByIdService from '../../services/participant/searchParticipantByIdService'
import { Controller } from '../protocols/IController'

export default class CreateParticipantController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const create = new SearchParticipantByIdService()
    const { body, statusCode } = await create.execute(request)
    return response.status(statusCode).json(body)
  }
}
