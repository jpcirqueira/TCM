import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addstatustournament1605222469697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tournaments',
      new TableColumn({
        name: 'status',
        type: 'bool',
        default: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tournaments')
  }
}
