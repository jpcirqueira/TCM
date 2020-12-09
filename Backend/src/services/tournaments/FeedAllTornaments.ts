/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import { getRepository } from 'typeorm'
import { Result, Service } from '../protocols/IServices'
import Tournaments from '../../models/tournament/tournament'

export class FeedAllTournamentsService implements Service {
  public async execute(): Promise<Result> {
    const playoffRepository = getRepository(Tournaments)

    const tournament = await playoffRepository.find({ where: { status: true } })

    if (typeof tournament !== 'undefined') {
      for (const t in tournament) {
        delete tournament[t].updated_at
        delete tournament[t].created_at
        delete tournament[t].manager.password
        delete tournament[t].manager.birthday
        delete tournament[t].manager.level
        delete tournament[t].manager.created_at
        delete tournament[t].manager.updated_at
      }

      return { body: { tournament }, statusCode: 200 }
    }

    return { body: { mensage: 'ERRO ao buscar' }, statusCode: 500 }
  }
}
