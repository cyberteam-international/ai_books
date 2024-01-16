import { Body, Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { UserDto } from "../users/dto/user.dto";
import { CreateUsersDto } from "../users/dto/create.users.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { LoginUsersDto } from "../users/dto/login.users.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateEmailUsersDto } from "../users/dto/update-email.users.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: "Регистрация" })
  @Post("/signup")
  @HttpCode(204)
  async signup(@Body() body: UpdateEmailUsersDto): Promise<void> {
    return this.authService.signup(body);
  }

  @ApiOperation({ summary: "Регистрация (Подтверждение почты)" })
  @Post("/signup/confirm")
  async confirm(@Body() body: CreateUsersDto): Promise<UserDto> {
    return this.authService.confirm(body);
  }

  @ApiOperation({ summary: "Авторизация" })
  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Request, @Body() body: LoginUsersDto) {
    return this.authService.login(req["user"]);
  }
}
