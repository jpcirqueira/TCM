/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Result, Service } from '../protocols/IServices'
import AppError from '../../errors/appError'
import Tournaments from '../../models/tournament/tournament'

export class CreatePlayoffService implements Service {
  public async execute(request: Request): Promise<Result> {
    const manager: string = request.user.id

    const {
      name,
      description,
      type,
      rules,
      players_quantity,
      start_date,
      end_date,
      estado,
      cidade,
      endereco,
    } = request.body

    const status = true
    const requiredFields = [
      'name',
      'description',
      'type',
      'rules',
      'players_quantity',
      'start_date',
      'end_date',
      'estado',
      'cidade',
      'endereco',
    ]

    for (const fields of requiredFields) {
      if (!request.body[fields]) {
        throw new AppError(`Missing Param: ${fields}`)
      }
    }

    const playoffRepository = getRepository(Tournaments)

    const checkTournaments = await playoffRepository.findOne({
      where: { name },
    })

    if (checkTournaments) {
      throw new AppError('Tournament name already exists')
    }

    const playoff = playoffRepository.create({
      name,
      description,
      type,
      rules,
      players_quantity,
      start_date,
      end_date,
      estado,
      cidade,
      endereco,
      manager,
      status,
    })

    try {
      await playoffRepository.save(playoff)
    } catch (err) {
      throw new AppError(err)
    }

    return { body: { playoff }, statusCode: 200 }
  }
}
