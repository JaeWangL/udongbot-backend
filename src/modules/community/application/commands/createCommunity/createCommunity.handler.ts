import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MemberRankType } from '@common/enums';
import { CommunityPreviewDto } from '@modules/community/dtos';
import { CommunityEntity, MemberEntity } from '@modules/community/entities';
import { CommunityRepository, MemberRepository } from '@modules/community/repositories';
import { UserRepository } from '@modules/identity/repositories';
import { toCommunityPreviewDTO } from '../../community.extensions';
import CreateCommunityCommand from './createCommunity.command';

@CommandHandler(CreateCommunityCommand)
export default class CreateCommunityHandler implements ICommandHandler<CreateCommunityCommand, CommunityPreviewDto> {
  constructor(
    private readonly commRepo: CommunityRepository,
    private readonly memberRepo: MemberRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(command: CreateCommunityCommand): Promise<CommunityPreviewDto> {
    const { req } = command;

    const newCommEntity = new CommunityEntity(
      req.name,
      req.description,
      req.profileUrl,
      req.coverUrl,
      req.creatorUserId,
    );
    const newComm = await this.commRepo.createAsync(newCommEntity);
    if (!newComm) {
      throw new InternalServerErrorException(
        'CreateCommunityHandler.createCommunity: Internal Creating Community Error',
      );
    }

    await this.createOwner(req.creatorUserId, newComm);

    return toCommunityPreviewDTO(newComm);
  }

  async createOwner(userId: number, newComm: CommunityEntity): Promise<void> {
    const user = await this.userRepo.findByIdAsync(userId);
    if (!user) {
      throw new NotFoundException('CreateCommunityHandler.createOwner: Not Found Owner User');
    }

    const newMemberEntity = new MemberEntity(
      newComm.id,
      userId,
      user.userName,
      user.name,
      user.profileUrl,
      MemberRankType.Owner,
    );

    const newMember = await this.memberRepo.createAsync(newMemberEntity);
    if (!newMember) {
      throw new InternalServerErrorException('CreateCommunityHandler.createOwner: Internal Creating Owner Error');
    }
  }
}
