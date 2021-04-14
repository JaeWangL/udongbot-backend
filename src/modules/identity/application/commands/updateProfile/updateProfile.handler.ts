import { NotFoundException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UserPreviewDto } from '@modules/identity/dtos';
import { ConfigService } from '@shared/services';
import { UserRepository } from '@modules/identity/repositories';
import { toUserPreviewDTO } from '../../extensions';
import UpdateProfileCommand from './updateProfile.command';

@CommandHandler(UpdateProfileCommand)
export default class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand, UserPreviewDto> {
  constructor(private readonly configSvc: ConfigService, private readonly userRepo: UserRepository) {}

  async execute(command: UpdateProfileCommand): Promise<UserPreviewDto> {
    const { req } = command;

    const user = await this.userRepo.findByIdAsync(req.userId);
    if (!user) {
      throw new NotFoundException('UpdateProfileHandler.execute: User not found');
    }

    user.updateProfile(req.name, req.profileUrl ? req.profileUrl : this.configSvc.get('DEFAULT_PROFILE_URL'));

    await this.userRepo.updateAsync(user);

    return toUserPreviewDTO(user);
  }
}
