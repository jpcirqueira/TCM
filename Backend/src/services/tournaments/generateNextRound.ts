/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Result, Service } from '../protocols/IServices'
import Tournaments from '../../models/tournament/tournament'
import { CreateRoundService } from '../round/createRoundService'
import { GetWinnersService } from '../round/getWinnersService'

export class GenerationNextRound implements Service {
  public async execute(request: Request): Promise<Result> {
    const id = request.params
    const name = request.body
    const tournamentRepository = getRepository(Tournaments)
    const tournament = await tournamentRepository.findOne({
      where: id,
    })
    // const round_list = []
    if (tournament.status === true) {
      const round_list = tournament.rounds
      let tamanho = 0
      for (const _ in round_list) {
        tamanho += 1
      }
      if (tamanho !== 0) {
        const ultimo_round = round_list[tamanho - 1]
        const getWinners = new GetWinnersService()
        const winners = await getWinners.execute(ultimo_round.id)

        if (winners.body.length === 0) {
          return {
            body: { message: 'Ainda existe partidas sem ganhadores' },
            statusCode: 500,
          }
        }
        if (winners.body.length === 1) {
          tournament.status = false
          await tournamentRepository.save(tournament)
          return {
            body: { message: 'O torneio chegou ao fim.' },
            statusCode: 500,
          }
        }
        const createRound = new CreateRoundService()
        const round_list = tournament.rounds

        round_list.push(round)
        tournament.rounds = round_list
        await tournamentRepository.save(tournament)

        const round = await createRound.execute(name, true, winners.body)
        return { body: round, statusCode: 200 }
      }
    }

    return { body: { message: 'Torneio já finalizado' }, statusCode: 500 }
  }
}
