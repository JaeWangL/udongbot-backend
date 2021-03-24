import { IQuery } from '@nestjs/cqrs';

export default class GetMembersWithCommQuery implements IQuery {
  constructor(readonly userId: number) {}
}
