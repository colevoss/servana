import { ClassType, IRouteMetadaData, Request, Response } from './interfaces';
import { Context } from './Context';
import { Server } from './Server';
import 'reflect-metadata';

export abstract class Service {
  public route: string = '';

  public contextFactory(request: Request, response: Response) {
    return new Context(request, response);
  }
}
