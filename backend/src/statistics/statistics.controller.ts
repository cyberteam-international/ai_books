import { Controller, Get, HttpCode, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { IsAdminGuard } from "../auth/guards/is-admin.guard";
import { StatisticsDto } from "./dto/statistics.dto";
import { StatisticsService } from "./statistics.service";
import { StatisticsOptionsDto } from "./dto/statistics-options.dto";

@Controller("statistics")
export class StatisticsController {

  constructor(private readonly statisticsService: StatisticsService) {
  }

  @ApiOperation({ summary: "Получение статистики" })
  @Get()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async getWorks(@Request() req: Request, @Query() query: StatisticsOptionsDto): Promise<StatisticsDto> {
    return this.statisticsService.getStats(query);
  }

  @ApiOperation({ summary: "Обновление посещения страницы" })
  @Post("visit")
  @HttpCode(204)
  async addVisit(@Request() req: Request) {
    this.statisticsService.addVisit();
  }
}
