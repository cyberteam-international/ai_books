import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsersDto } from "./dto/create.users.dto";
import { UpdateDataUsersDto } from "./dto/update-data.users.dto";
import { UsersEntity } from "./entities/users.entity";
import { UserDto } from "./dto/user.dto";
import { UpdateEmailUsersDto } from "./dto/update-email.users.dto";
import { UserJwtDto } from "./dto/user-jwt.dto";
import * as bcrypt from "bcrypt";
import { UpdateEmailConfirmUsersDto } from "./dto/update-email-confirm.users.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { join } from "path";
import { getRandomSymbolsNum } from "../utils/random";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>,
    private readonly mailerService: MailerService
  ) {
  }

  private confirmEmails: { email: string, code: string }[] = [];

  private transform(_user: UsersEntity): UserDto {
    return {
      id: _user.id,
      email: _user.email,
      name: _user.name,
      balance: _user.balance,
      is_admin: _user.is_admin
    };
  }

  async getCurrentUser(_user?: UserJwtDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id: _user.id }
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.transform(user);
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return await this.usersRepository.findOne({
      where: { email: email }
    });
  }

  async create(dto: CreateUsersDto): Promise<UserDto> {
    const isUser = await this.usersRepository.exist({
      where: { email: dto.email }
    });

    if (isUser) {
      throw new BadRequestException({
        statusCode: 400,
        key: "invalid_mail_registered",
        message: "This mail is already registered"
      });
    }

    const user = await this.usersRepository.save(dto);
    return this.transform(user);
  }

  async updateDataUser(_user: UserJwtDto, dto: UpdateDataUsersDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: _user.id }
      });

      if (user) {
        if (dto.password && dto.old_password) {
          const passwordValid = await bcrypt.compare(dto.old_password, user.password);

          if (!passwordValid) {
            throw "Passwords didn't match";
          }

          await this.usersRepository.update({
            id: _user.id
          }, {
            password: await bcrypt.hash(dto.password, 10)
          });
        } else if (dto.name) {
          await this.usersRepository.update({
            id: _user.id
          }, {
            name: dto.name
          });
        }
      }
    } catch (e) {
      throw new BadRequestException({
        statusCode: 400,
        key: "invalid_update_user",
        message: e || "Data update failed"
      });
    }
  }

  async updateEmailUser(_user: UserJwtDto, dto: UpdateEmailUsersDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: _user.id }
      });

      if (user) {
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
              id: user.id,
              name: user.name,
              code: code
            }
          });
      }
    } catch (e) {
      console.error(e);
      throw new BadRequestException({
        statusCode: 400,
        key: "invalid_update_user",
        message: e || "Data update failed"
      });
    }
  }

  async updateEmailConfirmUser(_user: UserJwtDto, dto: UpdateEmailConfirmUsersDto) {
    const user = await this.usersRepository.findOne({
      where: { id: _user.id }
    });

    if (user) {
      const confirmCode = this.confirmEmails.find((_code) => (_code.email === dto.email));

      if (!confirmCode || dto.code !== confirmCode.code) {
        throw new BadRequestException({
          statusCode: 400,
          key: "invalid_confirm_email",
          message: "Signup failed"
        });
      }

      if (confirmCode.code === dto.code) {
        await this.usersRepository.update({
          id: _user.id
        }, {
          email: dto.email
        });

        this.confirmEmails = this.confirmEmails.filter((_item) => (_item.email !== dto.email));
      } else {
        throw new BadRequestException({
          statusCode: 401,
          key: "invalid_confirm_code",
          message: "The transmitted code is not suitable"
        });
      }
    }
  }
}