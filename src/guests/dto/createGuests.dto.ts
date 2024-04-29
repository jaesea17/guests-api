/* eslint-disable @typescript-eslint/no-namespace */
import { IsOptional, IsString } from "class-validator";

export class CreateGuestDto {
  @IsString()
  name: string;
  @IsOptional()
  isChecked: boolean;
  @IsOptional()
  createdAt: Date;
}
