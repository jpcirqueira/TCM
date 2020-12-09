import { getRepository } from 'typeorm'
import { ResultMatch, PostResult } from './interfaces'
import Matchs from '../../../models/match/match'

export abstract class ServiceMatch {
  matchRepository = getRepository(Matchs)

  public async getMatch(): Promise<ResultMatch> {
    const match = {
      match_id: '',
      tournament_id: '',
      player1: {},
      player2: {},
      status: '',
    }
    return match
  }

  public async addResult(
    // id: string,
    // score: string,
    winner_id: string,
  ): Promise<PostResult> {
    const result = { message: 'Sucesso', statusCode: 200 }
    return result
  }

  public async setState(match_id: string): Promise<PostResult> {
    const result = { message: 'Sucesso', statusCode: 200 }
    return result
  }
}
