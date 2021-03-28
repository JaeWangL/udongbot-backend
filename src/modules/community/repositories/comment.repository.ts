import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities';

@Injectable()
export default class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async createAsync(newEntity: CommentEntity): Promise<CommentEntity> {
    return await this.commentRepo.save(newEntity);
  }

  async deleteByIdAsync(id: number): Promise<void> {
    await this.commentRepo.delete({ id });
  }

  async findByIdAsync(id: number, includeMember = false): Promise<CommentEntity | undefined> {
    if (includeMember) {
      const entity = await this.commentRepo.findOne({
        where: {
          id,
        },
        relations: ['member'],
      });

      return entity;
    }

    const entity = await this.commentRepo.findOne({
      where: {
        id,
      },
    });

    return entity;
  }

  async findMultipleByPostIdAsync(
    postId: number,
    includeMember = false,
    skip?: number,
    take?: number,
  ): Promise<[CommentEntity[], number]> {
    if (includeMember) {
      const entities = await this.commentRepo.findAndCount({
        where: {
          postId,
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

    const entities = await this.commentRepo.findAndCount({
      where: {
        postId,
      },
    });

    return entities;
  }

  async updateAsync(updatedEntity: CommentEntity): Promise<CommentEntity> {
    return await this.commentRepo.save(updatedEntity);
  }
}
