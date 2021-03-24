import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MemberWithCommunityDto } from '@modules/community/dtos';
import { MemberRepository } from '@modules/community/repositories';
import { toMembersWithCommDTO } from '../../member.extensions';
import GetMembersWithCommQuery from './getMembers-with-community.query';

@QueryHandler(GetMembersWithCommQuery)
export default class GetMembersWithCommHandler
  implements IQueryHandler<GetMembersWithCommQuery, MemberWithCommunityDto[]> {
  constructor(private readonly memberRepo: MemberRepository) {}

  async execute(query: GetMembersWithCommQuery): Promise<MemberWithCommunityDto[]> {
    const { userId } = query;

    const [members, totalItems] = await this.memberRepo.findMultipleByUserIdAsync(userId, true);

    return toMembersWithCommDTO(members);
  }
}
