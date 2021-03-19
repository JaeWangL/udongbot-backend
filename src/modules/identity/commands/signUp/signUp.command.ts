import { ICommand } from '@nestjs/cqrs';
import { SignUpRequest } from '../../dtos';

export default class SignUpCommand implements ICommand {
  constructor(public readonly req: SignUpRequest) {}
}
