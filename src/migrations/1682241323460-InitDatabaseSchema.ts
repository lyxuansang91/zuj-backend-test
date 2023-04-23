import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabaseSchema1682241323460 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `teams` (\n' +
        '`id` int PRIMARY KEY AUTO_INCREMENT,\n' +
        '`name` nvarchar(255) NOT NULL,\n' +
        '`scores` int DEFAULT (0),\n' +
        '`created_at` datetime DEFAULT (now()),\n' +
        '`updated_at` datetime DEFAULT (now())\n' +
        ')',
    );
    await queryRunner.query(
      'CREATE TABLE `matches` ( \n \
        `id` int PRIMARY KEY AUTO_INCREMENT, \n \
        `tournament_home` nvarchar(255) NOT NULL, \n \
        `home_team_id` int, \n \
        `away_team_id` int,\n \
        `score` int DEFAULT (0), \n \
        `start_at` datetime DEFAULT (now()), \n \
        `end_at` datetime DEFAULT (now()), \n \
        `created_at` datetime DEFAULT (now()), \n \
        `update_at` datetime DEFAULT (now()) \n \
      )',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teams', true);
    await queryRunner.dropTable('matches', true);
  }
}
