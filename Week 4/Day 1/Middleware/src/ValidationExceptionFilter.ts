
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  
  @Catch(HttpException)
  export class ValidationExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: HttpException, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;

  
      const ctx = host.switchToHttp();

  
      const httpStatus = exception.getStatus()
      const response = exception.getResponse()
      let message:unknown|string
      if(typeof response === 'object' && 'message' in response) {
          message = response[`message`]
      }
      else {
        message = response
      }


      
  
          const responseBody =  {
            statusCode: httpStatus,
            message:message ,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
          };
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
  