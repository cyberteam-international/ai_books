import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateWorksDto } from "./dto/create.works.dto";
import { WorksDto } from "./dto/works.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorksService } from "./works.service";
import { UpdateWorksDto } from "./dto/update.works.dto";
import { AllowAnonymous } from "../consts/consts";

@ApiTags("Works")
@Controller("works")
@UseGuards(JwtAuthGuard)
export class WorksController {

  constructor(private readonly worksService: WorksService) {
  }

  @ApiOperation({ summary: "Получение работ" })
  @Get()
  getWorks(@Request() req: Request): Promise<WorksDto[]> {
    return this.worksService.get(req["user"]);
  }

  @ApiOperation({ summary: "Получение работы по ID" })
  @Get(":id")
  getWorkById(@Request() req: Request, @Param("id") id: number): Promise<WorksDto> {
    return this.worksService.getById(id, req["user"]);
  }

  @ApiOperation({ summary: "Создание работы" })
  @Post()
  @AllowAnonymous()
  createWork(@Request() req: Request, @Body() body: CreateWorksDto): Promise<WorksDto> {
    return this.worksService.create(body, req["user"]);
  }

  @ApiOperation({ summary: "Обновление данных работы" })
  @Put(":id")
  updateWork(@Request() req: Request, @Body() body: UpdateWorksDto, @Param("id") id: number): Promise<WorksDto> {
    return this.worksService.updateById(id, body, req["user"]);
  }

  @ApiOperation({ summary: "Удаление работы" })
  @Delete(":id")
  deleteWork(@Request() req: Request, @Param("id") id: number): Promise<void> {
    return this.worksService.deleteById(id, req["user"]);
  }
}
