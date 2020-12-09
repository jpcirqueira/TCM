import { Request, Response } from 'express'
import { CreateParticipant } from '../../services/participant/participant'
import { Controller } from '../protocols/IController'

export default class CreateParticipantController implements Controller {
  async handle(request: Request, response: Response): Promise<Response> {
    const create = new CreateParticipant()
    const { body, statusCode } = await create.execute(request)
    return response.status(statusCode).json(body)
  }
}
