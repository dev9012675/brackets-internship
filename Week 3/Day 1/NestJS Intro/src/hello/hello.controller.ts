import { Controller , Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
    @Get()
    greeting():string {
        return "Hello World"
    }
}
