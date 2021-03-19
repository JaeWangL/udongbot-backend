import { RolesEnum } from '@infrastructure/decorators/roles.decorator';

export interface JwtStrategyValidate {
  id: number;
  email: string;
  role: RolesEnum;
}
