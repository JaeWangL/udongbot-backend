import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { PostDetailDto } from '@modules/community/dtos';
import { PostEntity } from '@modules/community/entities';
import { MemberRepository, PostRepository } from '@modules/community/repositories';
import { toPostDetailDTO } from '../../extensions';
import CreatePostCommand from './createPost.command';

@CommandHandler(CreatePostCommand)
export default class CreatePostHandler implements ICommandHandler<CreatePostCommand, PostDetailDto> {
  constructor(private readonly postRepo: PostRepository, private readonly memberRepo: MemberRepository) {}

  async execute(command: CreatePostCommand): Promise<PostDetailDto> {
    const { req } = command;

    const member = this.memberRepo.findByIdAsync(req.creatorMemberId);
    if (!member) {
      throw new NotFoundException('CreatePostHandler.execute: Member not founded');
    }

    const newPostEntity = new PostEntity(req.communityId, req.creatorMemberId, req.title, req.contentHtml);
    const newPost = await this.postRepo.createAsync(newPostEntity);
    const post = await this.postRepo.findByIdAsync(newPost.id, true);
    if (!post) {
      throw new InternalServerErrorException('CreatePostHandler.execute: Internal creating post error');
    }

    return toPostDetailDTO(post);
  }
}
