import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesController } from './employees/employees.controller';

@Module({
  imports: [],
  controllers: [AppController, EmployeesController],
  providers: [AppService],
})
export class AppModule {}
