import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateEmailUsersDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}