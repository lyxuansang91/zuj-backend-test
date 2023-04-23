import { Controller, Get, Req, Res, Next } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { FixtureService } from './fixture.service';

@ApiTags('FixturesEndpoint')
@Controller('fixtures')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Get()
  getFixtures(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = this.fixtureService.getFixtures();
      res.json({ result });
    } catch (error: unknown) {
      next(error);
    }
  }
}
