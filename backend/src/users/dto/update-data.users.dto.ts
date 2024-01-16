import { IsOptional } from "class-validator";

export class UpdateDataUsersDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    old_password?: string;

    @IsOptional()
    password?: string;
}