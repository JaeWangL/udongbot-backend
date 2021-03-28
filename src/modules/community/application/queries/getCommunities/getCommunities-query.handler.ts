import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { CommunityPreviewDto } from '@modules/community/dtos';
import { CommunityRepository } from '@modules/community/repositories';
import { toCommunitiesPreviewDTO } from '../../extensions';
import GetCommunitiesForQueryQuery from './getCommunities-query.query';

@QueryHandler(GetCommunitiesForQueryQuery)
export default class GetCommunitiesForQueryHandler
  implements IQueryHandler<GetCommunitiesForQueryQuery, PaginatedItemsViewModel<CommunityPreviewDto>> {
  constructor(private readonly commRepo: CommunityRepository) {}

  async execute(query: GetCommunitiesForQueryQuery): Promise<PaginatedItemsViewModel<CommunityPreviewDto>> {
    const { pageSize, pageIndex, searchQuery } = query;

    const [communities, totalItems] = await this.commRepo.findMultipleByQueryAsync(
      searchQuery,
      true,
      pageIndex,
      pageSize,
    );

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toCommunitiesPreviewDTO(communities));
  }
}
