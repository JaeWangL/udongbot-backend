import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Bcrypt from 'bcrypt';
import { UserPreviewDto } from '@modules/identity/dtos';
import { ConfigService } from '@shared/services';
import { UserEntity } from '../../entities';
import { UserRepository } from '../../repositories';
import SignUpCommand from './signUp.command';
import { toUserPreviewDTO } from '../../extensions';

@CommandHandler(SignUpCommand)
export default class SignUpHandler implements ICommandHandler<SignUpCommand, UserPreviewDto> {
  constructor(private readonly configSvc: ConfigService, private readonly userRepo: UserRepository) {}

  async execute(command: SignUpCommand): Promise<UserPreviewDto> {
    const { req } = command;

    const hashedPassword = await Bcrypt.hash(req.password, 10);
    const newUser = new UserEntity(
      req.email,
      req.name.toLowerCase(),
      req.name,
      req.profileUrl ? req.profileUrl : this.configSvc.get('DEFAULT_PROFILE_URL'),
      hashedPassword,
    );
    const user = await this.userRepo.createAsync(newUser);

    return toUserPreviewDTO(user);
  }
}
