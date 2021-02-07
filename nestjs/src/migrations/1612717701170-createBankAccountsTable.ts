import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBankAccountsTable1612717701170
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bank-accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'account_number',
            type: 'varchar',
          },
          {
            name: 'owner_name',
            type: 'varchar',
          },
          {
            name: 'balance',
            type: 'double precision',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bank_accounts');
  }
}
