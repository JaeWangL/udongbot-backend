import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import IdentityModule from '@modules/identity/identity.module';
import { AllCommandHandlers, AllQueryHandlers } from './application';
import { CommentsController, CommunitiesController, MembersController, PostsController } from './controllers';
import { CommentEntity, CommunityEntity, MemberEntity, PostEntity } from './entities';
import { CommentRepository, CommunityRepository, MemberRepository, PostRepository } from './repositories';

const AllControllers = [CommentsController, CommunitiesController, MembersController, PostsController];
const AllEntities = [CommentEntity, CommunityEntity, MemberEntity, PostEntity];
const AllRepositories = [CommentRepository, CommunityRepository, MemberRepository, PostRepository];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...AllEntities]), IdentityModule],
  controllers: [...AllControllers],
  providers: [...AllRepositories, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllRepositories],
})
export default class CommunityModule {}
