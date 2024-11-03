import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from '../insterfaces/tasks/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { Status } from '../enums/tasks/status.enum';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  create(createTaskDto: CreateTaskDto): Task {
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
  getAll(): Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    const found: Task = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  /**
   * @param id
   * @param createTaskDto
   * */
  update(id: string, createTaskDto: CreateTaskDto): Task {
    const task = this.getTaskById(id);
    const { title, description } = createTaskDto;
    task.title = title;
    task.description = description;
    return task;
  }
  delete(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
