import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from '../enums/tasks/task-status.enum';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException();
    } else {
      return found;
    }
  }
  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  /*private tasks: Task[] = [];
  getAll(): Task[] {
    return this.tasks;
  }

  /!**
   * @param id
   * @param createTaskDto
   * *!/
  update(id: string, createTaskDto: CreateTaskDto): Task {
    const task = this.getTaskById(id);
    const { title, description } = createTaskDto;
    task.title = title;
    task.description = description;
    return task;
  }
  */
}
