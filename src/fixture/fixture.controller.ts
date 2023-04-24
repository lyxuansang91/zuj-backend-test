import { Controller, Get, Req, Res, Next, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { GetFixturesDto, GetFixtureCalendarDto } from './dto';
import { FixtureService } from './fixture.service';

@ApiTags('FixturesEndpoint')
@Controller('fixtures')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Get()
  async getFixtures(
    @Query() { from, to, page, perPage }: GetFixturesDto,
  ): Promise<any> {
    try {
      const result = await this.fixtureService.getFixtures({
        from,
        to,
        page,
        perPage,
      });
      return result;
    } catch (error) {}
  }

  @Get('/calendar')
  async getFixtureCalendar(
    @Query() { from, to }: GetFixtureCalendarDto,
  ): Promise<any> {
    try {
      const result = await this.fixtureService.getFixturesCalendarEnable({
        from,
        to,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
