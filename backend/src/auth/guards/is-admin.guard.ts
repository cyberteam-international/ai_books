import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from "../../users/users.service";

@Injectable()
export class IsAdminGuard implements CanActivate {

  constructor(private readonly usersService: UsersService) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.getCurrentUser(request.user)

    return user.is_admin;
  }
}