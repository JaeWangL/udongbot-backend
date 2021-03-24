import { ICommand } from '@nestjs/cqrs';
import { CreateCommunityRequest } from '@modules/community/dtos';

export default class CreateCommunityCommand implements ICommand {
  constructor(public readonly req: CreateCommunityRequest) {}
}
