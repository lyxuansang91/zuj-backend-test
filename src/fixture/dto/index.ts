import { ApiProperty } from '@nestjs/swagger';
export class GetFixturesDto {
  @ApiProperty({ required: false })
  from?: number;

  @ApiProperty({ required: false })
  to?: number;

  @ApiProperty({ required: false, default: 1 })
  page?: number;

  @ApiProperty({ required: false, default: 10 })
  perPage?: number;
}

export class GetFixtureCalendarDto {
  @ApiProperty({ required: false })
  from?: number;

  @ApiProperty({ required: false })
  to?: number;
}
