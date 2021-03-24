import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '@common/entities';
// eslint-disable-next-line import/no-cycle
import MemberEntity from './member.entity';

@Entity('Communities')
export default class CommunityEntity extends AbstractEntity {
  @Column({ type: 'nvarchar', length: 30 })
  name: string;

  @Column({ type: 'nvarchar', length: 300 })
  description: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  profileUrl: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  coverUrl: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  website?: string;

  @Column({ type: 'bigint' })
  creatorUserId: number;

  @OneToMany(() => MemberEntity, (member) => member.community)
  members: MemberEntity[];

  constructor(
    name: string,
    description: string,
    profileUrl: string,
    coverUrl: string,
    creatorUserId: number,
    website?: string,
  ) {
    super();
    this.name = name;
    this.description = description;
    this.profileUrl = profileUrl;
    this.coverUrl = coverUrl;
    this.creatorUserId = creatorUserId;
    this.website = website;
  }

  updateSettings(name: string, description: string, profileUrl: string, coverUrl: string, website?: string): void {
    this.name = name;
    this.description = description;
    this.profileUrl = profileUrl;
    this.coverUrl = coverUrl;
    this.website = website;
    this.updatedAt = new Date();
  }
}
