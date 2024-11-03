import { Injectable } from '@nestjs/common';
import { Task } from '../insterfaces/tasks/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { Status } from '../enums/tasks/status.enum';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: Status.PENDING,
    };
    this.tasks.push(task);
    return task;
  }
  getTasks() {
    return this.tasks;
  }
}
