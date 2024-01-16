import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateWorksDto {
  @IsNotEmpty()
  lang: string;

  @IsNotEmpty()
  voice: string;

  @IsOptional()
  role?: string

  @IsNotEmpty()
  input_text: string;

  @IsOptional()
  name?: string;
}