
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


export function globalLogger(req:Request , res:Response , next:NextFunction) {
    console.log(`*************************Global Middleware********************`)
    console.log(`Request Method:${req.method}`);
    console.log(`Request URL:${req.originalUrl}`);
    console.log(`Request Timestamp:${Date.now()}`);
    next();
}

export function specificLogger(req:Request , res:Response , next:NextFunction) {
    console.log(`*************************Specific Middleware********************`)
    console.log(`Showing Request Body`)
    console.dir(req.body)
 
    next();
}
