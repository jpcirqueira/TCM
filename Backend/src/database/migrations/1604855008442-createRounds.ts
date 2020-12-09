import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRound1603563386521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'rounds',
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
            type: 'boolean',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'matchs_ids',
            type: 'varchar',
            isArray: true,
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
    await queryRunner.dropForeignKey('rounds', 'matchs_ids')
    await queryRunner.dropTable('rounds')
  }
}
