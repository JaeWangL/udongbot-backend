import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  async findByIdAsync(id: number, includeMembers = false): Promise<CommunityEntity | undefined> {
    if (includeMembers) {
      const member = await this.communityRepo.findOne({
        where: {
          id,
        },
        relations: ['members'],
      });

      return member;
    }

    const member = await this.communityRepo.findOne({
      where: {
        id,
      },
    });

    return member;
  }

  async findMultipleByQueryAsync(
    query: string,
    includeMembers = false,
    skip?: number,
    take?: number,
  ): Promise<[CommunityEntity[], number]> {
    if (includeMembers) {
      const members = await this.communityRepo.findAndCount({
        where: [{ name: Like(`%${query}%`) }, { description: Like(`%${query}%`) }],
        relations: ['members'],
        skip,
        take,
      });

      return members;
    }

    const members = await this.communityRepo.findAndCount({
      where: [{ name: Like(`%${query}%`) }, { description: Like(`%${query}%`) }],
    });

    return members;
  }

  async updateAsync(updatedCommunity: CommunityEntity): Promise<CommunityEntity> {
    return await this.communityRepo.save(updatedCommunity);
  }
}
