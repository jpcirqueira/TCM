/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import { getRepository } from 'typeorm'
import { Result } from '../protocols/IServices'
import Round from '../../models/round/round'
import PlayoffMatchService from '../match/playoffMatch/playoffMatchService'
import Matchs from '../../models/match/match'

export class ListMatchsInRoundService {
  public async execute(round_id: string): Promise<Result> {
    const roundRepository = getRepository(Round)
    let matchs_info_list = []

    let round = new Round()

    round = await roundRepository.findOne(round_id)
    const matchService = new PlayoffMatchService()
    let matchs_list = []

    try {
      for (const match in round.matchs_ids) {
        const result = await matchService.getMatch(round.matchs_ids[match])
        matchs_list.push(result)
      }
    const matchRepository = getRepository(Matchs)

    if(matchs_info_list.length != 0){
      matchs_info_list = await matchRepository.findByIds(matchs_list)
    }
    console.log("partidas em round: ",matchs_info_list)

    } catch (error) {
      return {
        body: { message: 'erro ao buscar partidas do round' },
        statusCode: 500,
      }
    }

    return { body: { matchs_list, matchs_info: matchs_info_list}, statusCode: 200 }
  }
}
