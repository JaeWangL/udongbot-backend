import { htmlToText } from 'html-to-text';
import { PostPreviewDto, PostDetailDto } from '../../dtos';
import { PostEntity } from '../../entities';

export const toPostPreviewDTO = (entity: PostEntity): PostPreviewDto => ({
  id: entity.id,
  memberUserName: entity.member.userUserName,
  memberName: entity.member.userName,
  memberProfileUrl: entity.member.userProfileUrl,
  title: entity.title,
  contentPlain: htmlToText(entity.contentHtml),
  likesCount: entity.likesCount,
  commentsCount: entity.comments ? entity.comments.length : 0,
  createdAt: entity.createdAt,
});

export const toPostDetailDTO = (entity: PostEntity): PostDetailDto => ({
  id: entity.id,
  creatorMemberId: entity.creatorMemberId,
  memberUserName: entity.member.userUserName,
  memberName: entity.member.userName,
  memberProfileUrl: entity.member.userProfileUrl,
  title: entity.title,
  contentHtml: entity.contentHtml,
  likesCount: entity.likesCount,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});

export const toPostsPreviewDTO = (entities: PostEntity[]): PostPreviewDto[] => entities.map((e) => toPostPreviewDTO(e));
