import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTypeDataOfScoreInMatch1682277171712
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `matches` alter column scores varchar(20)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `matches` alter column scores int');
  }
}
