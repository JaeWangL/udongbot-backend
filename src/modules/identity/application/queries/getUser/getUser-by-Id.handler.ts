import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserPreviewDto } from '@modules/identity/dtos';
import { UserRepository } from '@modules/identity/repositories';
import { toUserPreviewDTO } from '../../extensions';
import GetUserByIdQuery from './getUser-by-Id.query';

@QueryHandler(GetUserByIdQuery)
export default class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery, UserPreviewDto> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<UserPreviewDto> {
    const { id } = query;

    const user = await this.userRepo.findByIdAsync(id);
    if (user === undefined) {
      throw new NotFoundException('The user does not exist');
    }

    return toUserPreviewDTO(user);
  }
}
