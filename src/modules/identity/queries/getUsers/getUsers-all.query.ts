import { IQuery } from '@nestjs/cqrs';

export default class GetUsersAllQuery implements IQuery {
  constructor(readonly onlyVerified: boolean, readonly pageIndex: number, readonly pageSize: number) {}
}
