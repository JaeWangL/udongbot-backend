import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { CommentPreviewDto } from '@modules/community/dtos';
import { CommentRepository } from '@modules/community/repositories';
import { toCommentsPreviewDTO } from '../../extensions';
import GetCommentsByPostIdQuery from './getComments-by-postId.query';

@QueryHandler(GetCommentsByPostIdQuery)
export default class GetCommentsByPostIdHandler
  implements IQueryHandler<GetCommentsByPostIdQuery, PaginatedItemsViewModel<CommentPreviewDto>> {
  constructor(private readonly commentRepo: CommentRepository) {}

  async execute(query: GetCommentsByPostIdQuery): Promise<PaginatedItemsViewModel<CommentPreviewDto>> {
    const { pageSize, pageIndex, postId } = query;

    const [comments, totalItems] = await this.commentRepo.findMultipleByPostIdAsync(postId, true, pageIndex, pageSize);

    return new PaginatedItemsViewModel(pageIndex, pageSize, totalItems, toCommentsPreviewDTO(comments));
  }
}
