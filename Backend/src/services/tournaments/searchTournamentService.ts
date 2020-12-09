/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Result, Service } from '../protocols/IServices'
import AppError from '../../errors/appError'
import Tournaments from '../../models/tournament/tournament'

export class SearchTournamentsService implements Service {
  public async execute(request: Request): Promise<Result> {
    const { id } = request.user

    const playoffRepository = getRepository(Tournaments)

    const tournament = await playoffRepository.find({
      where: { manager: id },
    })

    if (tournament.length === 0) {
      throw new AppError('Not found Tournaments ')
    }

    return { body: { tournament }, statusCode: 200 }
  }
}
