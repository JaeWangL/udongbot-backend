import { CommunityPreviewDto } from '../dtos';
import { CommunityEntity } from '../entities';

export const toCommunityPreviewDTO = (entity: CommunityEntity): CommunityPreviewDto => ({
  id: entity.id,
  name: entity.name,
  description: entity.description,
  profileUrl: entity.profileUrl,
  coverUrl: entity.coverUrl,
  website: entity.website,
});

export const toCommunitiesPreviewDTO = (entities: CommunityEntity[]): CommunityPreviewDto[] =>
  entities.map((e) => toCommunityPreviewDTO(e));
