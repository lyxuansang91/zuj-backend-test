import { Injectable } from '@nestjs/common';

@Injectable()
export class FixtureService {
  getFixtures(): string {
    return 'Get Fixtures';
  }
}
