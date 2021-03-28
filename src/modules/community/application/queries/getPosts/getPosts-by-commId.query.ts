import { IQuery } from '@nestjs/cqrs';

export default class GetPostsByCommIdQuery implements IQuery {
  constructor(readonly communityId: number, readonly pageIndex: number, readonly pageSize: number) {}
}
