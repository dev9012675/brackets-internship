
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get(Roles, context.getHandler());

      const request = context.switchToHttp().getRequest();
      const user = request.body;

      
    if (  typeof user.role !== `string`  ||  !roles.includes(user.role.trim().toLowerCase())) {
      throw new ForbiddenException("You cannot access this route")
    }
    return true
  }
}
