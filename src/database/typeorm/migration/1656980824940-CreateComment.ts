import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateComment1656980824940 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comments',
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
          name: 'postId',
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
        {
          name: 'deletedBy',
          type: 'varchar',
          length: '12',
          isNullable: true,
        },
      ]
    }));

    await queryRunner.createForeignKeys('comments',
      [
        new TableForeignKey({
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
        }),
        new TableForeignKey({
          columnNames: ['postId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'posts',
          onDelete: 'CASCADE',
        }),
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments');
  }

}
