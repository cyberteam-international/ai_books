import {
  Body,
  Controller,
  Get, HttpCode, Put,
  Request, UseGuards
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateDataUsersDto } from "./dto/update-data.users.dto";
import { UpdateEmailUsersDto } from "./dto/update-email.users.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UpdateEmailConfirmUsersDto } from "./dto/update-email-confirm.users.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @ApiOperation({ summary: "Получение информации пользователя" })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@Request() req: Request) {
    return this.usersService.getCurrentUser(req["user"]);
  }

  @ApiOperation({ summary: "Обновление данных пользователя" })
  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(204)
  updateDataCurrentUser(@Request() req: Request, @Body() body: UpdateDataUsersDto) {
    return this.usersService.updateDataUser(req["user"], body);
  }

  @ApiOperation({ summary: "Обновление почты пользователя" })
  @UseGuards(JwtAuthGuard)
  @Put("email")
  @HttpCode(204)
  updateEmailCurrentUser(@Request() req: Request, @Body() body: UpdateEmailUsersDto) {
    return this.usersService.updateEmailUser(req["user"], body);
  }

  @ApiOperation({ summary: "Подтверждение обновления почты пользователя" })
  @UseGuards(JwtAuthGuard)
  @Put("email/confirm")
  @HttpCode(204)
  updateEmailConfirmCurrentUser(@Request() req: Request, @Body() body: UpdateEmailConfirmUsersDto) {
    return this.usersService.updateEmailConfirmUser(req["user"], body);
  }
}