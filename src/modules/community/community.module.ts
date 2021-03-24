import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import IdentityModule from '@modules/identity/identity.module';
import { AllCommandHandlers, AllQueryHandlers } from './application';
import { CommunitiesController, MembersController } from './controllers';
import { CommunityEntity, MemberEntity } from './entities';
import { CommunityRepository, MemberRepository } from './repositories';

const AllControllers = [CommunitiesController, MembersController];
const AllEntities = [CommunityEntity, MemberEntity];
const AllRepositories = [CommunityRepository, MemberRepository];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([...AllEntities]), IdentityModule],
  controllers: [...AllControllers],
  providers: [...AllRepositories, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllRepositories],
})
export default class CommunityModule {}
