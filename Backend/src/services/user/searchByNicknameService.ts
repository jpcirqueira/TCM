import { getRepository } from 'typeorm'
import { Request } from 'express'
import User from '../../models/user/user'
import AppError from '../../errors/appError'
import { Result, Service } from '../protocols/IServices'

class SearchByNicknameService implements Service {
  public async execute(request: Request): Promise<Result> {
    const { id } = request.params
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({
      where: { id },
      select: ['name'],
    })
    if (!user) {
      throw new AppError('User not found', 400)
    }
    return {
      body: { user },
      statusCode: 200,
    }
  }
}

export default SearchByNicknameService
