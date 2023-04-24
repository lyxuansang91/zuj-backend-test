import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class InitDatabaseSchema1682241323460 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teams',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          }),

          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          }),
          new TableColumn({
            name: 'scores',
            type: 'int',
            default: 0,
          }),

          new TableColumn({
            name: 'created_at',
            type: 'datetime',
            default: `NOW()`,
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'datetime',
            default: `NOW()`,
          }),
        ],
      }),
      true,
      false,
      false,
    );

    await queryRunner.createTable(
      new Table({
        name: 'matches',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          }),

          new TableColumn({
            name: 'tournament_home',
            type: 'varchar',
            length: '255',
            isNullable: false,
          }),

          new TableColumn({
            name: 'home_team_id',
            type: 'int',
          }),

          new TableColumn({
            name: 'away_team_id',
            type: 'int',
          }),

          new TableColumn({
            name: 'score',
            type: 'int',
            default: 0,
          }),

          new TableColumn({
            name: 'start_at',
            type: 'datetime',
            default: `NOW()`,
          }),
          new TableColumn({
            name: 'end_at',
            type: 'datetime',
            default: `NOW()`,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'datetime',
            default: `NOW()`,
          }),
          new TableColumn({
            name: 'update_at',
            type: 'datetime',
            default: `NOW()`,
          }),
        ],
      }),
      true,
      false,
      false,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teams', true);
    await queryRunner.dropTable('matches', true);
  }
}
