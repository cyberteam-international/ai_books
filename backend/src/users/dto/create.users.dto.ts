import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  code: string;
}