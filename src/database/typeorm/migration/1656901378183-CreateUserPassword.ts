import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateUserPassword1656901378183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'password',
      type: 'varchar',
      length: '50',
      isNullable: true,
    }));

    await queryRunner.query(`
      UPDATE users SET password = 'password' WHERE password IS NULL
    `);

    await queryRunner.changeColumn('users', 'password', new TableColumn({
      name: 'password',
      type: 'varchar',
      length: '80',
      isNullable: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password');
  }
}
