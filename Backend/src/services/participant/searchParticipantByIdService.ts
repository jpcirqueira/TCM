import { getRepository } from 'typeorm'
import { Request } from 'express'
import Participant from '../../models/participant/participant'
import AppError from '../../errors/appError'
import { Result, Service } from '../protocols/IServices'

class SearchParticipantByIdService implements Service {
  public async execute(request: Request): Promise<Result> {
    const { id } = request.params
    const participantRepository = getRepository(Participant)
    let participant
    try {
      participant = await participantRepository.findOne(id)
    } catch {
      throw new AppError('Participant id not found.', 400)
    }
    return {
      body: { participant },
      statusCode: 200,
    }
  }
}

export default SearchParticipantByIdService
