import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createAsync(newUser: UserEntity): Promise<UserEntity> {
    return await this.userRepo.save(newUser);
  }

  async findByIdAsync(id: number, isVerified = true): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne(id, {
      where: {
        isVerified,
      },
    });
  }

  async findByEmailAsync(email: string, isVerified = true): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne({
      where: {
        email,
        isVerified,
      },
    });
  }

  async findByEmailWithSocialAsync(
    email: string,
    socialType: number,
    socialId: string,
  ): Promise<UserEntity | undefined> {
    return await this.userRepo.findOne({
      where: {
        email,
        isVerified: true,
        socialType,
        socialId,
      },
    });
  }

  async findMultipleAllAsync(onlyVerified: boolean, skip?: number, take?: number): Promise<[UserEntity[], number]> {
    if (onlyVerified) {
      return await this.userRepo.findAndCount({
        where: {
          isVerified: true,
        },
        order: {
          createdAt: 'DESC',
        },
        skip,
        take,
      });
    }

    return await this.userRepo.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
  }

  async updateAsync(updatedUser: UserEntity): Promise<UserEntity> {
    return await this.userRepo.save(updatedUser);
  }
}
