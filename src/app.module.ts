import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  providers: [PrismaService],
})
export class AppModule {}
