import { UserPreviewDto } from '../../dtos';
import { UserEntity } from '../../entities';

export const toUserPreviewDTO = (user: UserEntity): UserPreviewDto => ({
  id: user.id,
  email: user.email,
  userName: user.userName,
  name: user.name,
  profileUrl: user.profileUrl,
});

export const toUsersPreviewDTO = (users: UserEntity[]): UserPreviewDto[] => users.map((u) => toUserPreviewDTO(u));
