import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from '../generated/prisma';

@Controller()
export class AppController {
  constructor(private readonly taskService: TasksService) {}

  @Get('tasks/:id')
  getTaskById(@Param('id') id: string): Promise<TaskModel | null> {
    return this.taskService.task({ id: Number(id) });
  }

  @Get('tasks')
  getTasks(): Promise<TaskModel[]> {
    return this.taskService.tasks({});
  }

  @Post('tasks')
  createTask(
    @Body() taskData: { title: string; completed?: boolean },
  ): Promise<TaskModel> {
    return this.taskService.createTask(taskData);
  }

  @Patch('tasks/:id')
  editTask(
    @Param('id') id: string,
    @Body() taskData: { title?: string; completed?: boolean },
  ): Promise<TaskModel> {
    return this.taskService.updateTask({
      where: { id: Number(id) },
      data: taskData,
    });
  }

  @Delete('tasks/:id')
  deleteTask(@Param('id') id: string): Promise<TaskModel> {
    return this.taskService.deleteTask({ id: Number(id) });
  }
}
