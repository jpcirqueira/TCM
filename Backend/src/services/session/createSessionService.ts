/* eslint-disable no-restricted-syntax */
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Request } from 'express'
import AppError from '../../errors/appError'
import User from '../../models/user/user'
import { Result, Service } from '../protocols/IServices'

class CreateSessionService implements Service {
  public async execute(request: Request): Promise<Result> {
    const { email, password } = request.body

    const requiredFields = ['email', 'password']
    for (const fields of requiredFields) {
      if (!request.body[fields]) {
        throw new AppError(`Missing Param: ${fields}`)
      }
    }

    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ where: { email } })
    if (!user) {
      throw new AppError('Email or Password invalids', 401)
    }
    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new AppError('Email or Password invalids', 401)
    }
    const token = sign({}, 'f295eb52d82423b1621a837193c98471', {
      expiresIn: '7d',
      subject: user.id,
    })

    return {
      body: {
        id: user.id,
        token,
      },
      statusCode: 200,
    }
  }
}

export default CreateSessionService
