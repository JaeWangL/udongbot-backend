import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@common/entities';
// eslint-disable-next-line import/no-cycle
import CommentEntity from './comment.entity';
// eslint-disable-next-line import/no-cycle
import MemberEntity from './member.entity';

@Entity('Posts')
export default class PostEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  communityId: number;

  @Column({ type: 'bigint' })
  creatorMemberId: number;

  @Column({ type: String, length: 100 })
  title: string;

  @Column({ type: String })
  contentHtml: string;

  @Column({ type: 'int' })
  likesCount: number;

  @ManyToOne(() => MemberEntity, (member) => member.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creatorMemberId', referencedColumnName: 'id' })
  member: MemberEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  constructor(communityId: number, creatorMemberId: number, title: string, contentHtml: string, likesCount = 0) {
    super();
    this.communityId = communityId;
    this.creatorMemberId = creatorMemberId;
    this.title = title;
    this.contentHtml = contentHtml;
    this.likesCount = likesCount;
  }

  decreaseLike(): void {
    this.likesCount -= 1;
  }

  increaseLike(): void {
    this.likesCount += 1;
  }

  updatePost(title: string, contentHtml: string): void {
    this.title = title;
    this.contentHtml = contentHtml;
    this.updatedAt = new Date();
  }
}
