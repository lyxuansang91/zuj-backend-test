import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [FixtureController],
  providers: [FixtureService],
})
export class FixtureModule {}
