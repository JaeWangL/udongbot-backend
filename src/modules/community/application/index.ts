import GetCommentsByPostIdHandler from './queries/getComments/getComments-by-postId.handler';
import GetCommunitiesForQueryHandler from './queries/getCommunities/getCommunities-query.handler';
import GetCommunityByIdHandler from './queries/getCommunity/getCommunity-by-Id.handler';
import GetMembersWithCommHandler from './queries/getMembers/getMembers-with-community.handler';
import GetPostByIdHandler from './queries/getPost/getPost-by-id.handler';
import GetPostsByCommIdHandler from './queries/getPosts/getPosts-by-commId.handler';
import CreateCommentHandler from './commands/createComment/createComment.handler';
import CreateCommunityHandler from './commands/createCommunity/createCommunity.handler';
import CreateMemberHandler from './commands/createMember/createMember.handler';
import CreatePostHandler from './commands/createPost/createPost.handler';

export { default as GetCommentsByPostIdQuery } from './queries/getComments/getComments-by-postId.query';
export { default as GetCommunitiesForQueryQuery } from './queries/getCommunities/getCommunities-query.query';
export { default as GetCommunityByIdQuery } from './queries/getCommunity/getCommunity-by-Id.query';
export { default as GetMembersWithCommQuery } from './queries/getMembers/getMembers-with-community.query';
export { default as GetPostByIdQuery } from './queries/getPost/getPost-by-id.query';
export { default as GetPostsByCommIdQuery } from './queries/getPosts/getPosts-by-commId.query';
export const AllQueryHandlers = [
  GetCommentsByPostIdHandler,
  GetCommunitiesForQueryHandler,
  GetCommunityByIdHandler,
  GetMembersWithCommHandler,
  GetPostByIdHandler,
  GetPostsByCommIdHandler,
];

export { default as CreateCommentCommand } from './commands/createComment/createComment.command';
export { default as CreateCommunityCommand } from './commands/createCommunity/createCommunity.command';
export { default as CreateMemberCommand } from './commands/createMember/createMember.command';
export { default as CreatePostCommand } from './commands/createPost/createPost.command';
export const AllCommandHandlers = [
  CreateCommentHandler,
  CreateCommunityHandler,
  CreateMemberHandler,
  CreatePostHandler,
];
