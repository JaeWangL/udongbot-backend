import { MemberPreviewDto, MemberWithCommunityDto } from '../../dtos';
import { MemberEntity } from '../../entities';

export const toMemberPreviewDTO = (entity: MemberEntity): MemberPreviewDto => ({
  id: entity.id,
  userUserName: entity.userUserName,
  userName: entity.userName,
  userProfileUrl: entity.userProfileUrl,
  rank: entity.rank,
  isOnline: entity.isOnline,
});

export const toMemberWithCommDTO = (entity: MemberEntity): MemberWithCommunityDto => ({
  id: entity.id,
  rank: entity.rank,
  commnunity: {
    id: entity.community.id,
    name: entity.community.name,
    profileUrl: entity.community.profileUrl,
  },
});

export const toMembersPreviewDTO = (entities: MemberEntity[]): MemberPreviewDto[] =>
  entities.map((e) => toMemberPreviewDTO(e));

export const toMembersWithCommDTO = (entities: MemberEntity[]): MemberWithCommunityDto[] =>
  entities.map((e) => toMemberWithCommDTO(e));
