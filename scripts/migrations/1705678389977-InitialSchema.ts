import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1705678389977 implements MigrationInterface {
  name = 'InitialSchema1705678389977';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."Roles_permissions_enum" AS ENUM('read', 'write', 'update', 'delete')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."Roles_roletype_enum" AS ENUM('user', 'admin')
        `);
    await queryRunner.query(`
            CREATE TABLE "Roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "permissions" "public"."Roles_permissions_enum" array NOT NULL,
                "roleType" "public"."Roles_roletype_enum" NOT NULL,
                CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "Roles"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Roles_roletype_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Roles_permissions_enum"
        `);
  }
}
