/* eslint-disable indent */
import {
  Column, Entity, OneToMany, PrimaryColumn,
} from 'typeorm';

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
}

export { User };
