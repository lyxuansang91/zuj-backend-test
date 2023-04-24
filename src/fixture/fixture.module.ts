import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match, Team } from '../entities';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team])],
  controllers: [FixtureController],
  providers: [FixtureService],
})
export class FixtureModule {}
