import { ICommand } from '@nestjs/cqrs';
import { CreatePostRequest } from '@modules/community/dtos';

export default class CreatePostCommand implements ICommand {
  constructor(public readonly req: CreatePostRequest) {}
}
