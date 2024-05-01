import { IsEmail, IsString, IsOptional } from "class-validator";

export class LoginUserDto {
  @IsOptional()
  // @IsEmail()
  email?: string;
  @IsString()
  password: string;
}
