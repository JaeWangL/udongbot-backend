import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { PostPreviewDto } from '@modules/community/dtos';
import { PostRepository } from '@modules/community/repositories';
import { toPostsPreviewDTO } from '../../extensions';
import GetPostsByCommIdQuery from './getPosts-by-commId.query';

@QueryHandler(GetPostsByCommIdQuery)
export default class GetPostsByCommIdHandler
  implements IQueryHandler<GetPostsByCommIdQuery, PaginatedItemsViewModel<PostPreviewDto>> {
  constructor(private readonly commentRepo: PostRepository) {}

  async execute(query: GetPostsByCommIdQuery): Promise<PaginatedItemsViewModel<PostPreviewDto>> {
    const { communityId, pageSize, pageIndex } = query;

    const [posts, totalItems] = await this.commentRepo.findMultipleByCommIdAsync(
      communityId,
      true,
      pageIndex,
      pageSize,
    );

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toPostsPreviewDTO(posts));
  }
}
