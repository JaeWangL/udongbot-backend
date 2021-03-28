import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommunityPreviewDto } from '@modules/community/dtos';
import { CommunityRepository } from '@modules/community/repositories';
import { NotFoundException } from '@nestjs/common';
import { toCommunityPreviewDTO } from '../../extensions';
import GetCommunityByIdQuery from './getCommunity-by-Id.query';

@QueryHandler(GetCommunityByIdQuery)
export default class GetCommunityByIdHandler implements IQueryHandler<GetCommunityByIdQuery, CommunityPreviewDto> {
  constructor(private readonly commRepo: CommunityRepository) {}

  async execute(query: GetCommunityByIdQuery): Promise<CommunityPreviewDto> {
    const { id } = query;

    const community = await this.commRepo.findByIdAsync(id, true);
    if (!community) {
      throw new NotFoundException('GetCommunityByIdHandler.excute: Community not founded');
    }

    return toCommunityPreviewDTO(community);
  }
}
