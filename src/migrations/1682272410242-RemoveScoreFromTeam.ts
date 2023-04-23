import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveScoreFromTeam1682272410242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teams', 'scores');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'teams',
      new TableColumn({ name: 'scores', type: 'int', default: 0 }),
    );
  }
}
