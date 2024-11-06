import { Controller, Param, Post , Put , Get, Delete, UseGuards, Body, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { User } from 'src/users/users.interface';

@Controller('api/employees')

@UseInterceptors(LoggingInterceptor , TransformInterceptor)
export class EmployeesController {
    @Get()
    find() {
        return `Find all Employees`
    }

    @Get(`:id`)
    findOne(@Param(`id`) id:string) {
        return `Found employee having id:${id}`
    }

    @Post()
    @UseGuards(RolesGuard)
    @Roles([`admin`])
    create(@Body() user:User) {

        
        return "Employee Created"
    }

    @Put(`:id`)
    @UseGuards(RolesGuard)
    @Roles([`admin`])
    update(@Param(`id`) id:string){
        return `Employee having id ${id} updated`

    }

    @Delete(`:id`)
    delete(@Param(`id`) id:string){
        return `Employee having id ${id} has been deleted`

    }
}

