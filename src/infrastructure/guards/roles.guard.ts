import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { RolesEnum } from '../decorators';
import { JwtDecodeResponse } from '../interfaces';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request: FastifyRequest = context.switchToHttp().getRequest();
    const tokenData = this.jwtService.decode(
      request.headers.authorization?.split('Bearer')[1].trim() as string,
    ) as JwtDecodeResponse | null;
    if (tokenData?.role === RolesEnum.ADMIN) {
      return true;
    }

    return !tokenData ? false : roles.includes(tokenData.role.toString());
  }
}
