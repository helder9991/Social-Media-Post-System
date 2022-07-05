/* eslint-disable indent */
import {
  Column, Entity, OneToMany, PrimaryColumn,
} from 'typeorm';
import { Post } from '../../post/entities/Post';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

export { User };
