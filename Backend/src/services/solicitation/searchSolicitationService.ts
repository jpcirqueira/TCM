/* eslint-disable no-restricted-syntax */
import { Request } from 'express'
import { getRepository } from 'typeorm'
import Solicitations from '../../models/solicitations/solitications'
import { Result, Service } from '../protocols/IServices'

class SearchSolicitationService implements Service {
  public async execute(request: Request): Promise<Result> {
    const solicittionRepository = getRepository(Solicitations)

    const { tournament } = request.params

    const solicitation = await solicittionRepository.find({
      where: { tournaments: tournament },
    })

    return {
      body: {
        solicitation,
      },
      statusCode: 200,
    }
  }
}

export default SearchSolicitationService
