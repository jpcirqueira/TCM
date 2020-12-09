import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import Tournaments from '../tournament/tournament'

@Entity('participants')
class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Tournaments, tournament => tournament.participants)
  tournaments: Tournaments

  @Column()
  status: boolean

  @Column()
  participant_type: string

  @Column()
  players: string

  @Column({ nullable: true })
  tournament_points: number

  @Column({ nullable: true })
  win_count: number

  @Column({ nullable: true })
  loss_count: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Participant
