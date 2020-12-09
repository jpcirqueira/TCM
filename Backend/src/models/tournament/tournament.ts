/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import Participant from '../participant/participant'
import Solicitations from '../solicitations/solitications'

import User from '../user/user'
import Round from '../round/round'

@Entity('tournaments')
class Tournaments {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  type: string

  @Column()
  rules: string

  @Column()
  players_quantity: number

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column({ default: false })
  status: boolean

  @OneToMany(() => Solicitations, solicitation => solicitation.tournaments, {
    nullable: true,
    eager: true,
  })
  solicitations: Solicitations[]

  @OneToMany(() => Participant, participant => participant.tournaments, {
    nullable: true,
    eager: true,
  })
  participants: Participant[]

  @OneToMany(() => Round, round => round.tournaments, {
    nullable: true,
    eager: true,
  })
  rounds: Round[]

  @ManyToOne(() => User, user => user.id, {
    eager: true,
  })
  manager: User

  @Column()
  estado: string

  @Column()
  cidade: string

  @Column()
  endereco: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Tournaments
