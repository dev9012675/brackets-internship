import { MiddlewareConsumer, Module, NestModule , RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { specificLogger } from './middleware/logger.middleware';
import { StudentsController } from './students/students.controller';


@Module({
  imports: [StudentsModule ,  MongooseModule.forRoot('mongodb://localhost/internship')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(specificLogger).exclude(
      
        { path: 'api/students', method: RequestMethod.GET },
        { path: 'api/students/:id', method: RequestMethod.GET },
        { path: 'api/students/:id', method: RequestMethod.DELETE },
      
    )
    .forRoutes(StudentsController)
  }
}
