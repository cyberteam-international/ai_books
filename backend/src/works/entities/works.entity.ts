import {
  Column,
  CreateDateColumn,
  Entity, Index, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { UsersEntity } from "../../users/entities/users.entity";

@Entity("works")
export class WorksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({nullable: true})
  name: string;

  @Index()
  @Column()
  lang: string;

  @Index()
  @Column()
  voice: string;

  @Column({ type: "text" })
  input_text: string;

  @Column("text", {
    array: true,
    nullable: true
  })
  fragments: string[];

  @Column("text", {
    array: true,
    nullable: true
  })
  fragmentsTranscribe: string[];

  @Column("text", {
    array: true,
    nullable: true
  })
  output_files: string[];

  @Column({ nullable: true, default: null })
  completed_file: string;

  @Column({ type: 'float', default: 0 })
  completed_seconds: number

  @ManyToOne(() => UsersEntity, {nullable: true})
  @Index()
  user?: UsersEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}