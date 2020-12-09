/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Result, Service } from '../protocols/IServices'
import Tournaments from '../../models/tournament/tournament'
import { CreateRoundService } from '../round/createRoundService'

export class GenerationRound implements Service {
  public async execute(request: Request): Promise<Result> {
    const id = request.params
    const name = request.body
    const tournamentRepository = getRepository(Tournaments)
    const tournament = await tournamentRepository.findOne({
      where: id,
    })
    const players = tournament.participants

    const player_id = []
    for (const player in players) {
      player_id.push(players[player].id)
    }
    const createRound = new CreateRoundService()

    const round = await createRound.execute(name, true, player_id)
    const round_list = tournament.rounds

    round_list.push(round)
    tournament.rounds = round_list
    await tournamentRepository.save(tournament)

    return { body: { round, players }, statusCode: 200 }
  }
}
