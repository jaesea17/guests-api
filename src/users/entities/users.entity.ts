import { RolesEntity } from "../../auth/roles_permissions/entities/roles.entity";
import { RolesEnum } from "../../auth/roles_permissions/enums/role.enum";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column("varchar")
  address: string;

  @Column({
    type: "enum",
    enum: RolesEnum,
  })
  roleType: RolesEnum = RolesEnum.User;

  @OneToOne(() => RolesEntity, (rolesEntity) => rolesEntity.users, {
    eager: true,
  })
  @JoinColumn()
  rolesEntity: RolesEntity;
}
