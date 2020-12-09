/* eslint-disable no-restricted-syntax */
import { Request } from 'express'
import { getRepository } from 'typeorm'
import { UUIDv4 } from 'uuid-v4-validator'
import AppError from '../../errors/appError'
import Solicitations from '../../models/solicitations/solitications'
import Tournaments from '../../models/tournament/tournament'
import User from '../../models/user/user'
import { Result, Service } from '../protocols/IServices'

class CreateSolicitationService implements Service {
  public async execute(request: Request): Promise<Result> {
    const solicittionRepository = getRepository(Solicitations)
    const userRepository = getRepository(User)
    const tournamentRepository = getRepository(Tournaments)

    const { id } = request.user
    const { tournament } = request.params

    const validator = UUIDv4.validate(tournament)

    if (validator === false) {
      throw new AppError('Id do torneio inválido')
    }

    const user = await userRepository.findOne({ where: { id } })

    if (!user) {
      throw new AppError('Usuário não existe')
    }

    const tournamentExists = await tournamentRepository.findOne({
      where: { id: tournament },
    })

    if (!tournamentExists) {
      throw new AppError('Torneio não existe')
    }

    const solicitationExists = await solicittionRepository.findOne({
      where: { requester: id, tournaments: tournament },
    })

    if (solicitationExists) {
      throw new AppError('Solicitação já enviada')
    }

    const solicitation = await solicittionRepository.create({
      requester: id,
      tournaments: tournament,
    })

    try {
      await solicittionRepository.save(solicitation)
    } catch (err) {
      throw new AppError(err)
    }
    return {
      body: {
        solicitation,
      },
      statusCode: 200,
    }
  }
}

export default CreateSolicitationService
