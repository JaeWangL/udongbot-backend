import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { UserPreviewDto } from '../../dtos';
import { UserRepository } from '../../repositories';
import { toUsersPreviewDTO } from '../../extensions';
import GetUsersAllQuery from './getUsers-all.query';

@QueryHandler(GetUsersAllQuery)
export default class GetUsersAllHandler
  implements IQueryHandler<GetUsersAllQuery, PaginatedItemsViewModel<UserPreviewDto>> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: GetUsersAllQuery): Promise<PaginatedItemsViewModel<UserPreviewDto>> {
    const { onlyVerified, pageIndex, pageSize } = query;

    const [users, totalItems] = await this.userRepo.findMultipleAllAsync(onlyVerified, pageIndex, pageSize);

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toUsersPreviewDTO(users));
  }
}
