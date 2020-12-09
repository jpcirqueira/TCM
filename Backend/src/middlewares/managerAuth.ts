import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import AppError from '../errors/appError'
import Tournaments from '../models/tournament/tournament'

export default async function managerAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user

  const tournamentId = request.params.id
    ? request.params.id
    : request.params.tournament

  if (!id) {
    throw new AppError('id não encontrado', 401)
  }

  const tournamentRepository = getRepository(Tournaments)

  const manager = await tournamentRepository.findOne({
    where: { id: tournamentId, manager: id },
  })

  if (!manager) {
    throw new AppError('Você não é o gerente do torneio')
  }

  next()
}
