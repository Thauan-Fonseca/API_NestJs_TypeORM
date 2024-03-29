import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1709301282626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '127',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '127',
          },
          {
            name: 'birthAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP()',
          },
          {
            name: 'role',
            type: 'int',
            default: 0,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

/* id int UN AI PK 
name varchar(63) 
email varchar(127) 
password varchar(127) 
birthAt date 
role int 
createdAt datetime(6) 
updatedAt datetime(6) */
