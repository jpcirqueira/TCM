import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMatch1603814491469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'matchs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'char',
          },
          {
            name: 'user_winner_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'participant_winner_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'player1_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'player2_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'participant1_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'participant2_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'local',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'score',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('matchs')
  }
}
