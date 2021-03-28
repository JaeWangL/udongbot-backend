import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities';

@Injectable()
export default class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  async createAsync(newEntity: PostEntity): Promise<PostEntity> {
    return await this.postRepo.save(newEntity);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.postRepo.delete({ id });
  }

  async findByIdAsync(id: number, includeMember = false): Promise<PostEntity | undefined> {
    if (includeMember) {
      const entity = await this.postRepo.findOne({
        where: {
          id,
        },
        relations: ['member'],
      });

      return entity;
    }

    const entity = await this.postRepo.findOne({
      where: {
        id,
      },
    });

    return entity;
  }

  async findMultipleByCommIdAsync(
    communityId: number,
    includeMember = false,
    skip?: number,
    take?: number,
  ): Promise<[PostEntity[], number]> {
    if (includeMember) {
      const entities = await this.postRepo.findAndCount({
        where: {
          communityId,
        },
        relations: ['member'],
        order: {
          createdAt: 'DESC',
        },
        skip,
        take,
      });

      return entities;
    }

    const entities = await this.postRepo.findAndCount({
      where: {
        communityId,
      },
    });

    return entities;
  }

  async updateAsync(updatedEntity: PostEntity): Promise<PostEntity> {
    return await this.postRepo.save(updatedEntity);
  }
}
