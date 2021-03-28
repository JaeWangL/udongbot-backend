import { ICommand } from '@nestjs/cqrs';
import { CreateCommentRequest } from '@modules/community/dtos';

export default class CreateCommentCommand implements ICommand {
  constructor(public readonly req: CreateCommentRequest) {}
}
