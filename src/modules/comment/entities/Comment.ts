/* eslint-disable indent */
import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { User } from '../../user/entities/User';

@Entity('comments')
class Comment {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  postId: string;

  @Column()
  description: string;

  @Column()
  deletedBy?: string;
}

export { Comment };
