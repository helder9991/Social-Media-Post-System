import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreatePost1656945239247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {
          name: 'id',
          isPrimary: true,
          type: 'varchar',
          length: '50',
          isNullable: false,
        },
        {
          name: 'userId',
          type: 'varchar',
          length: '50',
          isNullable: false,
        },
        {
          name: 'title',
          type: 'varchar',
          length: '100',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          length: '100',
          isNullable: false,
        },
      ],
    }));

    await queryRunner.createForeignKey('posts', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
