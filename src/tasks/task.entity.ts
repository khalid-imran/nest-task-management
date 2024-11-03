import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enums/tasks/task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: Status;
}
