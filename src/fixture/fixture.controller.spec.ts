import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';
import { DataSource } from 'typeorm';
import { Match, Team } from '../entities';

describe('FixtureController', () => {
  let fixtureController: FixtureController;
  let fixtureService: FixtureService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Match, Team],
          synchronize: false,
          migrations: [__dirname + '/../migrations/*.ts'],
        }),
        TypeOrmModule.forFeature([Match, Team]),
      ],
      controllers: [FixtureController],
      providers: [FixtureService],
    }).compile();

    fixtureController = app.get<FixtureController>(FixtureController);
    dataSource = app.get<DataSource>(DataSource);
    fixtureService = app.get<FixtureService>(FixtureService);
  });

  beforeEach(async () => {
    const initData = async () => {
      const teamsData = [
        { name: 'MU' },
        { name: 'Chelsea' },
        { name: 'Liverpool' },
      ];

      const teamRepos = dataSource.getRepository(Team);
      const teamsResult = await teamRepos.save(teamRepos.create(teamsData));
      const matchesData = [
        {
          tournamentHome: 'EPL',
          homeTeam: teamsResult[0],
          awayTeam: teamsResult[1],
          score: '3-0',
          startAt: '2023-04-24 03:08:08',
          endAt: '2023-04-24 03:08:08',
        },
        {
          tournamentHome: 'EPL',
          homeTeam: teamsResult[1],
          awayTeam: teamsResult[2],
          score: '1-1',
          startAt: '2023-04-24 03:08:16',
          endAt: '2023-04-24 03:08:16',
        },
        {
          tournamentHome: 'EPL',
          homeTeam: teamsResult[2],
          awayTeam: teamsResult[0],
          score: '1-1',
          startAt: '2023-03-01 03:08:33',
          endAt: '2023-04-24 03:08:40',
        },
      ];
      const matchRepos = dataSource.getRepository(Match);
      await matchRepos.save(matchesData);
    };
    await dataSource.dropDatabase();
    await dataSource.runMigrations();
    await initData();
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  describe('fixture listing', () => {
    it('fixture listing with no parameters', async () => {
      const fixturesList = await fixtureService.getFixtures({
        page: 1,
        perPage: 10,
      });

      expect(fixturesList.page).toEqual(1);
      expect(fixturesList.perPage).toEqual(10);
      expect(fixturesList.totalItem).toEqual(3);
      const { data } = fixturesList;
      expect(data.length).toEqual(3);
      expect(data[0].matches_id).toEqual(1);
      expect(data[1].matches_id).toEqual(2);
      expect(data[2].matches_id).toEqual(3);
      const matchOne = await dataSource
        .getRepository(Match)
        .createQueryBuilder('matches')
        .leftJoinAndSelect('matches.homeTeam', 'homeTeam')
        .leftJoinAndSelect('matches.awayTeam', 'awayTeam')
        .where('matches.id = :id', { id: data[0].matches_id })
        .getOne();
      expect(matchOne.homeTeam.id).toEqual(data[0].matches_home_team_id);
      expect(matchOne.awayTeam.id).toEqual(data[0].matches_away_team_id);

      const fixtureListFromController = await fixtureController.getFixtures({
        page: 1,
        perPage: 10,
      });
      expect(fixtureListFromController).toEqual(fixturesList);
    });

    it('fixture listing with from and to valid', async () => {
      const fixturesList = await fixtureService.getFixtures({
        from: 1677677968,
        to: 1682343582,
        page: 1,
        perPage: 10,
      });

      expect(fixturesList.page).toEqual(1);
      expect(fixturesList.perPage).toEqual(10);
      expect(fixturesList.totalItem).toEqual(2);
      const { data } = fixturesList;
      expect(data.length).toEqual(2);
      expect(data[0].matches_id).toEqual(1);
      expect(data[1].matches_id).toEqual(2);
      const matchOne = await dataSource
        .getRepository(Match)
        .createQueryBuilder('matches')
        .leftJoinAndSelect('matches.homeTeam', 'homeTeam')
        .leftJoinAndSelect('matches.awayTeam', 'awayTeam')
        .where('matches.id = :id', { id: data[0].matches_id })
        .getOne();
      expect(matchOne.homeTeam.id).toEqual(data[0].matches_home_team_id);
      expect(matchOne.awayTeam.id).toEqual(data[0].matches_away_team_id);
    });

    it('fixture listing with from, to out of range', async () => {
      const fixturesList = await fixtureService.getFixtures({
        from: 1682343582,
        to: 1682343582,
        page: 1,
        perPage: 10,
      });
      expect(fixturesList.data.length).toEqual(0);
      expect(fixturesList.totalItem).toEqual(0);
    });

    it('fixture listing with pagination', async () => {
      const fixturesList = await fixtureService.getFixtures({
        page: 1,
        perPage: 2,
      });
      expect(fixturesList.data.length).toEqual(2);
      expect(fixturesList.totalItem).toEqual(2);

      const fixturesListPageTwo = await fixtureService.getFixtures({
        page: 2,
        perPage: 2,
      });

      expect(fixturesListPageTwo.data.length).toEqual(1);
      expect(fixturesListPageTwo.totalItem).toEqual(1);
    });
  });

  describe('fixture calendar', () => {
    it('fixture calendar without from, to', async () => {
      const days = await fixtureService.getFixturesCalendarEnable({});
      expect(days.length).toEqual(2);
      expect(days[0].day).toEqual('2023-02-28');
      expect(days[1].day).toEqual('2023-04-23');

      const resultInController = await fixtureController.getFixtureCalendar({});
      //   console.log(resultInController);
      expect(resultInController).toEqual(days);
      expect(resultInController.length).toEqual(2);
      expect(resultInController[0].day).toEqual('2023-02-28');
      expect(resultInController[1].day).toEqual('2023-04-23');
    });

    it('fixture calendar from 2023-02-01 to now', async () => {
      // from 2023-02-01 to now
      const days = await fixtureService.getFixturesCalendarEnable({
        from: 1675258768,
        to: 1682349131,
      });
      expect(days.length).toEqual(2);
      expect(days[0].day).toEqual('2023-02-28');
      expect(days[1].day).toEqual('2023-04-23');
    });

    it('fixture calendar from 2023-04-01 to now', async () => {
      // from 2023-02-01 to now
      const days = await fixtureService.getFixturesCalendarEnable({
        from: 1680356368,
        to: 1682349131,
      });
      expect(days.length).toEqual(1);
      expect(days[0].day).toEqual('2023-04-23');
    });

    it('fixture calendar from 2023-04-24 to now', async () => {
      // from 2023-02-01 to now
      const days = await fixtureService.getFixturesCalendarEnable({
        from: 1682343568,
        to: 1682349300,
      });
      expect(days.length).toEqual(0);
    });
  });
});
