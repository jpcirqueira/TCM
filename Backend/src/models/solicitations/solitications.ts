/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm'
import Tournaments from '../tournament/tournament'

import User from '../user/user'

@Entity('solicitations')
class Solicitations {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, user => user.id, { eager: true })
  requester: User

  @ManyToOne(() => Tournaments, tournament => tournament.solicitations)
  tournaments: Tournaments

  @Column({ default: false })
  accepted: boolean

  // @ManyToOne(type => Tournaments, solicitations => Solicitations, {
  //   eager: true,
  // })
  // tournament: Tournaments
}

export default Solicitations
