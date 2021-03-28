import { CommentPreviewDto } from '../../dtos';
import { CommentEntity } from '../../entities';

export const toCommentPreviewDTO = (entity: CommentEntity): CommentPreviewDto => ({
  id: entity.id,
  creatorMemberId: entity.creatorMemberId,
  memberUserName: entity.member.userUserName,
  memberName: entity.member.userName,
  memberProfileUrl: entity.member.userProfileUrl,
  message: entity.message,
  likesCount: entity.likesCount,
});

export const toCommentsPreviewDTO = (entities: CommentEntity[]): CommentPreviewDto[] =>
  entities.map((e) => toCommentPreviewDTO(e));
