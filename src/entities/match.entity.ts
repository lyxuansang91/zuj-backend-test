import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity({ name: 'matches' })
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tournament_home' })
  tournamentHome: string;

  @ManyToOne(() => Team, (team: Team) => team.id)
  @JoinColumn({ name: 'home_team_id' })
  public homeTeam: Team;

  @ManyToOne(() => Team, (team: Team) => team.id)
  @JoinColumn({ name: 'away_team_id' })
  public awayTeam: Team;

  @Column({ type: 'varchar', length: 200 })
  score: string;

  @Column({ type: 'datetime', name: 'start_at' })
  startAt: Date;

  @Column({ type: 'datetime', name: 'end_at' })
  endAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
