import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { RolesEnum } from "src/auth/roles_permissions/enums/role.enum";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(RolesEnum)
  @IsOptional()
  roles?: RolesEnum;
}
