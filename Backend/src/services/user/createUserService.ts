/* eslint-disable no-restricted-syntax */
import { getRepository } from 'typeorm'

import { hash } from 'bcryptjs'
import { Request } from 'express'
import User from '../../models/user/user'
import AppError from '../../errors/appError'
import { Result, Service } from '../protocols/IServices'

class CreateUserService implements Service {
  public async execute(request: Request): Promise<Result> {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      level,
      birthday,
      nickname,
    } = request.body
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
      'level',
      'birthday',
      'nickname',
    ]
    for (const fields of requiredFields) {
      if (!request.body[fields]) {
        throw new AppError(`Missing Param: ${fields}`)
      }
    }

    if (password !== passwordConfirmation) {
      throw new AppError('Passwords dont match')
    }

    const userRepository = getRepository(User)

    const checkEmailExistence = await userRepository.findOne({
      where: { email },
    })

    const checkNicknameExistence = await userRepository.findOne({
      where: { nickname },
    })

    if (checkEmailExistence) {
      throw new AppError('Email already in use')
    }

    if (checkNicknameExistence) {
      throw new AppError('Nickname already in use')
    }

    const passwordHash = await hash(password, 8)

    const user = userRepository.create({
      name,
      password: passwordHash,
      email,
      level,
      birthday,
      nickname,
    })

    try {
      await userRepository.save(user)
    } catch (err) {
      throw new AppError(err, 500)
    }
    return {
      body: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      statusCode: 201,
    }
  }
}
export default CreateUserService
