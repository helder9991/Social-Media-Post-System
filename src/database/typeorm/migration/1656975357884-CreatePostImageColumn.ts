import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CreatePostImageColumn1656975357884 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('posts',
      [
        new TableColumn({
          name: 'key',
          type: 'varchar',
          length: '150',
          isNullable: true,
        }),
        new TableColumn({
          name: 'url',
          type: 'varchar',
          length: '150',
          isNullable: true,
        })
      ]
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('posts', ['key', 'url']);
  }

}
