/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import Solicitations from '../solicitations/solitications'
import Tournaments from '../tournament/tournament'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => Tournaments, tournaments => tournaments.manager)
  tournaments: Tournaments[]

  @OneToMany(() => Solicitations, solicitations => solicitations.requester)
  solicitations: Solicitations[]

  @Column()
  name: string

  @Column()
  nickname: string

  @Column()
  email: string

  @Column()
  level: string

  @Column()
  password: string

  @Column()
  birthday: Date

  @Column({ nullable: true })
  photo: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
