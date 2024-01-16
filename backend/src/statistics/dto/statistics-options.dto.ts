import { IsOptional } from "class-validator";

export class StatisticsOptionsDto {
  @IsOptional()
  start_date?: string;

  @IsOptional()
  end_date?: string;
}



