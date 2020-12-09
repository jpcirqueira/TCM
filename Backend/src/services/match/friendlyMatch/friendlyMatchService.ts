import { getRepository } from 'typeorm'
import { ServiceMatch } from '../template/match'
import { ResultMatch, PostResult } from '../template/interfaces'
import User from '../../../models/user/user'

class FriendlyMatchService extends ServiceMatch {
  public async getMatch(id: string): Promise<ResultMatch> {
    const match = await this.matchRepository.findOne(id, {
      relations: ['player1_id', 'player2_id', 'user_winner_id'],
    })
    if (typeof match !== 'undefined') {
      const player1 = { id: match.player1_id.id, name: match.player1_id.name }
      const player2 = { id: match.player2_id.id, name: match.player2_id.name }

      return {
        match_id: match.id,
        player1,
        player2,
        status: match.status,
        score: match.score,
        winner: match.user_winner_id == null ? '' : match.user_winner_id.name,
        statusCode: 200,
      }
    }
    return {
      statusCode: 500,
    }
  }

  public async addResult(
    match_id: string,
    score: string,
    winner_id: string,
  ): Promise<PostResult> {
    const userRepository = getRepository(User)

    const match = await this.matchRepository.findOne(match_id)
    const user = await userRepository.findOne(winner_id)

    if (typeof match !== 'undefined' && typeof user !== 'undefined') {
      // const user = new user();
      match.score = score
      match.user_winner_id = user
      match.status = 'F'

      try {
        await this.matchRepository.save(match)

        return { message: 'Resultado adicionado com sucesso!', statusCode: 200 }
      } catch (error) {
        return { message: 'Erro ao salvar!', statusCode: 500 }
      }
    }

    return { message: 'Erro ao adicionar resultado', statusCode: 500 }
  }

  public async setState(match_id: string, status: string): Promise<PostResult> {
    const match = await this.matchRepository.findOne(match_id)

    if (typeof match !== 'undefined') {
      match.status = status
      try {
        await this.matchRepository.save(match)
      } catch (error) {
        return { message: 'Erro ao salvar!', statusCode: 500 }
      }
      return { message: 'Status adicionado com sucesso!', statusCode: 200 }
    }
    return { message: 'Error!', statusCode: 500 }
  }
}

export default FriendlyMatchService
