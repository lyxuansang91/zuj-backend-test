import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { DataSource } from 'typeorm';
import * as moment from 'moment-timezone';

@Injectable()
export class FixtureService {
  private readonly logger = new Logger(FixtureService.name);
  constructor(private readonly dataSource: DataSource) {}

  async getFixtures(
    from: number,
    to: number,
    page: number,
    perPage: number,
  ): Promise<any> {
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
      queryBuilder.where('matches.end_at <= :to', {
        to: moment(to * 1000).toDate(),
      });
    }
    queryBuilder.skip(skip).limit(perPage);
    const results = await queryBuilder.getRawMany();
    return { data: results, page, perPage, totalItem: results.length };
  }

  async getFixturesCalendarEnable(from, to: number): Promise<any> {
    const calendar = this.dataSource
      .getRepository(Match)
      .createQueryBuilder('matches')
      .select('DATE(start_at) as day')
      .addSelect('1', 'enabled')
      .where('matches.start_at < :to', { to: moment(to * 1000).toDate() })
      .where('matches.start_at > :from', { from: moment(from * 1000).toDate() })
      .groupBy('day')
      .orderBy('day');
    const results = await calendar.getRawMany();

    return results.map((result: { day: string; enabled: string }) => {
      return {
        day: moment(result.day).format('YYYY-MM-DD'),
      };
    });
  }
}
