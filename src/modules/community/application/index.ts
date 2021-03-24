import GetCommunitiesForQueryHandler from './queries/getCommunities/getCommunities-query.handler';
import GetCommunityByIdHandler from './queries/getCommunity/getCommunity-by-Id.handler';
import GetMembersWithCommHandler from './queries/getMembers/getMembers-with-community.handler';
import CreateCommunityHandler from './commands/createCommunity/createCommunity.handler';
import CreateMemberHandler from './commands/createMember/createMember.handler';

export { default as GetCommunitiesForQueryQuery } from './queries/getCommunities/getCommunities-query.query';
export { default as GetCommunityByIdQuery } from './queries/getCommunity/getCommunity-by-Id.query';
export { default as GetMembersWithCommQuery } from './queries/getMembers/getMembers-with-community.query';
export const AllQueryHandlers = [GetCommunitiesForQueryHandler, GetCommunityByIdHandler, GetMembersWithCommHandler];

export { default as CreateCommunityCommand } from './commands/createCommunity/createCommunity.command';
export { default as CreateMemberCommand } from './commands/createMember/createMember.command';
export const AllCommandHandlers = [CreateCommunityHandler, CreateMemberHandler];
