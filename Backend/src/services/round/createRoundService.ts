/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import { getRepository } from 'typeorm'
import AppError from '../../errors/appError'
import Round from '../../models/round/round'
import CreateMatchService from '../match/createMatchService'

export class CreateRoundService {
  public async execute(
    name: string,
    status: boolean,
    participant_ids: string[],
  ): Promise<Round> {
    const roundRepository = getRepository(Round)

    const matchs_ids: string[] = []

    function participantRandom() {
      const aux = Math.floor(Math.random() * participant_ids.length)
      const participant = participant_ids[aux]
      participant_ids = participant_ids.filter(v => v !== participant)
      return participant
    }
    const createMatch = new CreateMatchService()

    if (participant_ids.length % 2 !== 0) {
      const particpant1 = participantRandom()
      const match_result = await createMatch.execute('', particpant1, '')
      matchs_ids.push(String(match_result.match_id))
    }

    while (participant_ids.length !== 0) {
      const particpant1 = participantRandom()
      const particpant2 = participantRandom()
      const match_result = await createMatch.execute(
        '',
        particpant1,
        particpant2,
      )
      matchs_ids.push(String(match_result.match_id))
    }
    const round = new Round()
    try {
      round.name = name
      round.status = status
      round.matchs_ids = matchs_ids
      await roundRepository.save(round)
    } catch (error) {
      throw new AppError('Não foi possivel realizar a operação', 500)
    }

    return round
  }
}
