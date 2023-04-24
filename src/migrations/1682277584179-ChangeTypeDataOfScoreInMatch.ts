import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeTypeDataOfScoreInMatch1682277171712
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'matches',
      'score',
      new TableColumn({
        name: 'score',
        type: 'varchar',
        length: '255',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'matches',
      'score',
      new TableColumn({
        name: 'score',
        type: 'integer',
        default: 0,
      }),
    );
  }
}
