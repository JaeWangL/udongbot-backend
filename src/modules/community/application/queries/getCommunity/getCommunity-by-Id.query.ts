import { IQuery } from '@nestjs/cqrs';

export default class GetCommunityByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
