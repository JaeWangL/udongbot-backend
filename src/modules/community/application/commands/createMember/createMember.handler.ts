import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { MemberPreviewDto } from '@modules/community/dtos';
import { MemberEntity } from '@modules/community/entities';
import { MemberRepository } from '@modules/community/repositories';
import { UserRepository } from '@modules/identity/repositories';
import { toMemberPreviewDTO } from '../../member.extensions';
import CreateMemberCommand from './createMember.command';

@CommandHandler(CreateMemberCommand)
export default class CreateMemberHandler implements ICommandHandler<CreateMemberCommand, MemberPreviewDto> {
  constructor(private readonly memberRepo: MemberRepository, private readonly userRepo: UserRepository) {}

  async execute(command: CreateMemberCommand): Promise<MemberPreviewDto> {
    const { req } = command;

    const user = await this.userRepo.findByIdAsync(req.userId);
    if (!user) {
      throw new NotFoundException('CreateMemberHandler.createMember: Not Found Member User');
    }

    const newMemberEntity = new MemberEntity(req.communityId, req.userId, user.userName, user.name, user.profileUrl);
    const newMember = await this.memberRepo.createAsync(newMemberEntity);
    if (!newMember) {
      throw new InternalServerErrorException('CreateMemberHandler.createMember: Internal Creating Member Error');
    }

    return toMemberPreviewDTO(newMember);
  }
}
