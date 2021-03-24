import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityEntity } from '../entities';

@Injectable()
export default class CommunityRepository {
  constructor(
    @InjectRepository(CommunityEntity)
    private communityRepo: Repository<CommunityEntity>,
  ) {}

  async createAsync(newCommunity: CommunityEntity): Promise<CommunityEntity> {
    return await this.communityRepo.save(newCommunity);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.communityRepo.delete({ id });
  }

  async findByIdAsync(id: number): Promise<CommunityEntity | undefined> {
    const member = await this.communityRepo.findOne({
      where: {
        id,
      },
    });

    return member;
  }

  async findMultipleByQueryAsync(query: string): Promise<[CommunityEntity[], number]> {
    const members = await this.communityRepo.findAndCount({
      where: [{ name: `%${query}%` }, { description: `%${query}%` }],
    });

    return members;
  }

  async updateAsync(updatedCommunity: CommunityEntity): Promise<CommunityEntity> {
    return await this.communityRepo.save(updatedCommunity);
  }
}
