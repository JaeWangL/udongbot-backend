import { RolesEnum } from '@infrastructure/decorators/roles.decorator';

export interface DecodedUser {
  readonly id: number;
  readonly email: string;
  readonly userName: string;
  readonly name: string;
  readonly profileUrl: string;
  readonly role: RolesEnum;
  readonly iat: number;
  readonly exp: number;
}
