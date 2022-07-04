/* eslint-disable indent */
import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { User } from '../../user/entities/User';

@Entity('posts')
class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user?: string;

  @Column()
  title: string;

  @Column()
  description: string;
}

export { Post };
