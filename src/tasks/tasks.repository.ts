import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { Status } from '../enums/tasks/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.create({
      title,
      description,
      status: Status.PENDING,
    });
    await this.save(task);
    return task;
  }
}
