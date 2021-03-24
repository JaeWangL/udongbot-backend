import { IQuery } from '@nestjs/cqrs';

export default class GetCommunitiesForQueryQuery implements IQuery {
  constructor(readonly searchQuery: string, readonly pageIndex: number, readonly pageSize: number) {}
}
