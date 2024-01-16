import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateEmailConfirmUsersDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    code: string;
}