/* eslint-disable indent */
import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { Post } from '../../post/entities/Post';

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
