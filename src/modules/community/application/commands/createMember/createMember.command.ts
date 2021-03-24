import { ICommand } from '@nestjs/cqrs';
import { CreateMemberRequest } from '@modules/community/dtos';

export default class CreateMemberCommand implements ICommand {
  constructor(public readonly req: CreateMemberRequest) {}
}
