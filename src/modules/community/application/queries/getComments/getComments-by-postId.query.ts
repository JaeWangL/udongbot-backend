import { IQuery } from '@nestjs/cqrs';

export default class GetCommentsByPostIdQuery implements IQuery {
  constructor(readonly postId: number, readonly pageIndex: number, readonly pageSize: number) {}
}
