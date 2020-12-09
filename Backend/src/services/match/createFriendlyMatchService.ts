import { getRepository } from 'typeorm'
import { Request } from 'express'
import Matchs from '../../models/match/match'
import User from '../../models/user/user'
import AppError from '../../errors/appError'
import { Result, Service } from '../protocols/IServices'

class CreateFriendlyMatchService implements Service {
  public async execute(request: Request): Promise<Result> {
    const { user_id, opponent_id } = request.body

    const matchRepository = getRepository(Matchs)
    const userRepository = getRepository(User)

    const match = new Matchs()

    const user = await userRepository.findOne(user_id)
    const opponent = await userRepository.findOne(opponent_id)

    try {
      match.player1_id = user
      match.player2_id = opponent
      match.status = 'C'

      const create = await matchRepository.create(match)
      await matchRepository.save(create)
      delete match.player1_id.password
      delete match.player1_id.created_at
      delete match.player2_id.created_at
      delete match.player1_id.updated_at
      delete match.player2_id.updated_at
      delete match.player2_id.password

      return {
        body: { match },
        statusCode: 200,
      }
    } catch (error) {
      throw new AppError('Create Match ERROR.', 500)
    }

    // return {body:"",statusCode:500}
  }
}

export default CreateFriendlyMatchService
