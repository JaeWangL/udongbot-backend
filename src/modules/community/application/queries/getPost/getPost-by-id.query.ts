import { IQuery } from '@nestjs/cqrs';

export default class GetPostByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
