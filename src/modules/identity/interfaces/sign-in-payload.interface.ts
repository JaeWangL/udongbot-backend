import { RolesEnum } from '@infrastructure/decorators/roles.decorator';

export interface SignInPayload {
  readonly id: number;
  readonly email: string;
  readonly userName: string;
  readonly name: string;
  readonly profileUrl: string;
  readonly role: RolesEnum;
}
