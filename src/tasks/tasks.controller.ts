import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Task as TaskModel } from '../../generated/prisma';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  findAll(): Promise<TaskModel[]> {
    return this.taskService.tasks({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TaskModel | null> {
    return this.taskService.task({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskModel> {
    return this.taskService.updateTask({
      where: { id: Number(id) },
      data: updateTaskDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TaskModel> {
    return this.taskService.deleteTask({ id: Number(id) });
  }
}
