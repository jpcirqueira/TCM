import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createParticipant1603239567685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'participants',
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
            type: 'bool',
            default: false,
          },
          {
            name: 'participant_type',
            type: 'char',
            isNullable: true,
          },
          {
            name: 'players',
            type: 'uuid',
          },
          {
            name: 'tournament_points',
            type: 'integer',
          },
          {
            name: 'win_count',
            type: 'integer',
          },
          {
            name: 'loss_count',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'date',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'date',
            default: 'now()',
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('participants')
  }
}
