import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../enums/role.enum';
import { PermissionsEnum } from '../enums/permissions.enum';
import { Users } from '../../../users/entities/users.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PermissionsEnum, array: true })
  permissions: PermissionsEnum[] = [PermissionsEnum.READ];

  @Column({ type: 'enum', enum: RolesEnum })
  roleType: RolesEnum;

  @OneToOne(() => Users, (users) => users.rolesEntity)
  users: Users;
}
