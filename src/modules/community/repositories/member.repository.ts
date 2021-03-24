import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from '../entities';

@Injectable()
export default class MemberRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepo: Repository<MemberEntity>,
  ) {}

  async createAsync(newMember: MemberEntity): Promise<MemberEntity> {
    return await this.memberRepo.save(newMember);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.memberRepo.delete({ id });
  }

  async findByIdAsync(id: number): Promise<MemberEntity | undefined> {
    const member = await this.memberRepo.findOne({
      where: {
        id,
      },
    });

    return member;
  }

  async findByCommunityAndUserIdAsync(communityId: number, userId: number): Promise<MemberEntity | undefined> {
    const member = await this.memberRepo.findOne({
      where: {
        communityId,
        userId,
      },
    });

    return member;
  }

  async findMultipleByCommunityIdAsync(communityId: number): Promise<[MemberEntity[], number]> {
    const members = await this.memberRepo.findAndCount({
      where: {
        communityId,
      },
    });

    return members;
  }

  async findMultipleByUserIdAsync(userId: number, includeCommunity = false): Promise<[MemberEntity[], number]> {
    if (includeCommunity) {
      const members = await this.memberRepo.findAndCount({
        where: {
          userId,
        },
        relations: ['community'],
      });

      return members;
    }

    const members = await this.memberRepo.findAndCount({
      where: {
        userId,
      },
    });

    return members;
  }

  async updateAsync(updatedMember: MemberEntity): Promise<MemberEntity> {
    return await this.memberRepo.save(updatedMember);
  }
}
