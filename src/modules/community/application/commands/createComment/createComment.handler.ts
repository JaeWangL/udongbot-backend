import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CommentPreviewDto } from '@modules/community/dtos';
import { CommentEntity } from '@modules/community/entities';
import { CommentRepository, MemberRepository } from '@modules/community/repositories';
import { toCommentPreviewDTO } from '../../extensions';
import CreateCommentCommand from './createComment.command';

@CommandHandler(CreateCommentCommand)
export default class CreateCommentHandler implements ICommandHandler<CreateCommentCommand, CommentPreviewDto> {
  constructor(private readonly commentRepo: CommentRepository, private readonly memberRepo: MemberRepository) {}

  async execute(command: CreateCommentCommand): Promise<CommentPreviewDto> {
    const { req } = command;

    const member = this.memberRepo.findByIdAsync(req.creatorMemberId);
    if (!member) {
      throw new NotFoundException('CreateCommentHandler.execute: Member not founded');
    }

    const newCommentEntity = new CommentEntity(req.communityId, req.creatorMemberId, req.postId, req.message);
    const newComment = await this.commentRepo.createAsync(newCommentEntity);
    const comment = await this.commentRepo.findByIdAsync(newComment.id, true);
    if (!comment) {
      throw new InternalServerErrorException('CreateCommentHandler.execute: Internal creating comment error');
    }

    return toCommentPreviewDTO(comment);
  }
}
