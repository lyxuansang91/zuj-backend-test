import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTypeDataOfScoreInMatch1682277171712
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `matches` modify column `score` varchar(255)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `matches` modify column `score` int');
  }
}
