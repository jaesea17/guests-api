import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // private readonly roleService: RolesService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const requiredRoles: RolesEnum[] = this.reflector.getAllAndOverride<
      RolesEnum[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    const { user } = context.switchToHttp().getRequest();
    console.log('USER>>>>>', user);

    // const dbRole = await this.roleService.findRoleById(
    //   user.role,
    //   user.platform,
    //   context.switchToHttp().getRequest(),
    // );

    // if (!dbRole) return false;

    // return requiredRoles.some((role) => {
    //   if (role.indexOf(',') > 0) {
    //     return role.split(',').includes(dbRole.roleCategory.roleType);
    //   }
    //   return user.role.includes(role);
    // });
    return false;
  }
}
