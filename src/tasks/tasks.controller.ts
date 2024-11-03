import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  // @Get()
  // getAll(): Task[] {
  //   return this.taskService.getAll();
  // }
  @Get('/:id')
  get(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }
  // @Put('/:id')
  // update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.update(id, createTaskDto);
  // }
  @Delete('/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.taskService.delete(id);
  }
}
