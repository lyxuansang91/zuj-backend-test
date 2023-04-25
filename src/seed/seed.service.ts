import { Injectable, Logger } from '@nestjs/common';
import { Match, Team } from '../entities';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(private readonly dataSource: DataSource) {}

  async getHello(): Promise<any> {
    return 'Hello Seed';
  }

  async createTeamData(): Promise<Team[]> {
    const n = Math.floor(Math.random() * 10) + 1;
    const teams = [];
    for (let i = 0; i < n; i++) {
      const name = faker.name.fullName();
      const createdAt = faker.date.recent(60);
      const updatedAt = createdAt;
      teams.push({ name, createdAt, updatedAt });
    }
    // return teams;
    const teamRepo = this.dataSource.getRepository(Team);
    return await teamRepo.save(teams);
  }

  async createMatchData(numberOfTeam: number): Promise<Match[]> {
    const n = Math.floor(Math.random() * 10) + 1;
    const matches = [];
    for (let i = 0; i < n; i++) {
      const homeTeamId = Math.floor(Math.random() * n) + 1;
      let awayTeamId: number;
      do {
        awayTeamId = Math.floor(Math.random() * numberOfTeam) + 1;
      } while (awayTeamId === homeTeamId);
      console.log({ homeTeamId, awayTeamId });
      const startAt = faker.date.recent(60);
      const matchData = {
        tournamentHome: faker.name.jobTitle(),
        homeTeam: homeTeamId,
        awayTeam: awayTeamId,
        score: `${faker.datatype.number(10)}-${faker.datatype.number(10)}`,
        startAt,
        endAt: startAt,
        createdAt: startAt,
        updatedAt: startAt,
      };
      matches.push(matchData);
    }
    const matchRepos = this.dataSource.getRepository(Match);
    return await matchRepos.save(matches);
  }

  async createSeedData(): Promise<void> {
    const teams = await this.createTeamData();
    await this.createMatchData(teams.length);
  }
}
