import { CustomDecorator, SetMetadata } from '@nestjs/common';

export enum RolesEnum {
  USER = 0,
  ADMIN = 1,
}

export const Roles = (...roles: RolesEnum[]): CustomDecorator<string> => SetMetadata('roles', roles);
