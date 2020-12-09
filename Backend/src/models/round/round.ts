/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import Tournaments from '../tournament/tournament'

@Entity('rounds')
class Round {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  status: boolean

  @Column()
  name: string

  @Column('varchar', { array: true })
  matchs_ids: string[]

  @ManyToOne(() => Tournaments, tournament => tournament.rounds)
  tournaments: Tournaments

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Round
