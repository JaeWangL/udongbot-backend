import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostDetailDto } from '@modules/community/dtos';
import { PostRepository } from '@modules/community/repositories';
import { toPostDetailDTO } from '../../extensions';
import GetPostByIdQuery from './getPost-by-id.query';

@QueryHandler(GetPostByIdQuery)
export default class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery, PostDetailDto> {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(query: GetPostByIdQuery): Promise<PostDetailDto> {
    const { id } = query;

    const post = await this.postRepo.findByIdAsync(id, true);
    if (!post) {
      throw new NotFoundException('GetPostByIdHandler.execute: Post not founded');
    }

    return toPostDetailDTO(post);
  }
}
