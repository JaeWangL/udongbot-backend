import { ICommand } from '@nestjs/cqrs';
import { SignInRequest } from '../../dtos';

export default class SignInCommand implements ICommand {
  constructor(public readonly req: SignInRequest) {}
}
