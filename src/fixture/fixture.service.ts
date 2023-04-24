import { Injectable, Logger } from '@nestjs/common';
import { Match } from '../entities';
import { DataSource } from 'typeorm';
import * as moment from 'moment-timezone';

@Injectable()
export class FixtureService {
  private readonly logger = new Logger(FixtureService.name);
  constructor(private readonly dataSource: DataSource) {}

  async getFixtures({
    from,
    to,
    perPage,
    page,
  }: {
    from?: number;
    to?: number;
    perPage: number;
    page: number;
  }): Promise<any> {
    const skip = (page - 1) * perPage;
    const queryBuilder = this.dataSource
      .getRepository(Match)
      .createQueryBuilder('matches')
      .innerJoinAndSelect(
        'teams',
        'home_teams',
        'matches.home_team_id = home_teams.id',
      )
      .innerJoinAndSelect(
        'teams',
        'away_teams',
        'matches.away_team_id = away_teams.id',
      );

    if (from) {
      queryBuilder.where('matches.start_at >= :from', {
        from: moment(from * 1000).toDate(),
      });
    }
    if (to) {
      queryBuilder.andWhere('matches.end_at <= :to', {
        to: moment(to * 1000).toDate(),
      });
    }
    const results = await queryBuilder.offset(skip).limit(perPage).getRawMany();
    return {
      data: results,
      page: Number(page),
      perPage: Number(perPage),
      totalItem: results.length,
    };
  }

  async getFixturesCalendarEnable({
    from,
    to,
  }: {
    from?: number;
    to?: number;
  }): Promise<any> {
    const matchRepo = this.dataSource.getRepository(Match);
    const matchQuery = matchRepo
      .createQueryBuilder('matches')
      .select('DATE(start_at) as day')
      .addSelect('1', 'enabled');
    if (from) {
      matchQuery.where('matches.start_at > :from', {
        from: moment(from * 1000).toDate(),
      });
    }
    if (to) {
      matchQuery.andWhere('matches.start_at < :to', {
        to: moment(to * 1000).toDate(),
      });
    }
    matchQuery.groupBy('day').orderBy('day');
    const results = await matchQuery.getRawMany();

    return results.map((result: { day: string; enabled: string }) => {
      return {
        day: moment(result.day).format('YYYY-MM-DD'),
      };
    });
  }
}
