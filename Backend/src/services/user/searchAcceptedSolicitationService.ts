/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { getRepository } from 'typeorm'
import { Request } from 'express'
import AppError from '../../errors/appError'
import { Result, Service } from '../protocols/IServices'
import Solicitations from '../../models/solicitations/solitications'

class SearchAcceptedSolicitationService implements Service {
  public async execute(request: Request): Promise<Result> {
    const { id } = request.user

    try {
      const solicitationRepository = getRepository(Solicitations)
      const solicitation = await solicitationRepository.find({
        where: { requester: id, accepted: true },
        relations: ['tournaments'],
      })

      for (const t in solicitation) {
        delete solicitation[t].id
        delete solicitation[t].accepted
      }

      return {
        body: { solicitation },
        statusCode: 200,
      }
    } catch (error) {
      throw new AppError('Não foi possivel encontrar torneio(s)', 500)
    }
  }
}

export default SearchAcceptedSolicitationService
