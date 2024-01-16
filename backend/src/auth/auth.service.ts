import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { CreateUsersDto } from "../users/dto/create.users.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersEntity } from "../users/entities/users.entity";
import { UpdateEmailUsersDto } from "../users/dto/update-email.users.dto";
import { getRandomSymbolsNum } from "../utils/random";
import { join } from "path";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {
  }

  private confirmEmails: { email: string, code: string }[] = [];

  async signup(dto: UpdateEmailUsersDto) {
    const isEmail = await this.usersService.getUserByEmail(dto.email);

    if (isEmail) {
      throw new BadRequestException({
        statusCode: 400,
        key: "invalid_email_is_already",
        message: "Signup failed"
      });
    }

    const code = getRandomSymbolsNum(5);

    this.confirmEmails.push({
      email: dto.email,
      code: code
    });

    await this.mailerService
      .sendMail({
        to: dto.email,
        subject: "Подтверждение почты",
        template: join(__dirname, "/../templates", "confirm"),
        context: {
          name: dto.email,
          code: code
        }
      });
  }

  async confirm(dto: CreateUsersDto) {
    const confirmCode = this.confirmEmails.find((_code) => (_code.email === dto.email));

    if (!confirmCode || dto.code !== confirmCode.code) {
      throw new BadRequestException({
        statusCode: 400,
        key: "invalid_confirm_email",
        message: "Signup failed"
      });
    }

    this.confirmEmails = this.confirmEmails.filter((_item) => (_item.email !== dto.email));

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      code: dto.code
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) return user;

    return null;
  }

  async login(user: UsersEntity) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
