import {
  Column,
  CreateDateColumn,
  Entity, Index, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { WorksEntity } from "../../works/entities/works.entity";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  email: string;

  @Index()
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => WorksEntity, (_work) => _work.user)
  works: WorksEntity[];

  @Column({type: "boolean", default: false})
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}