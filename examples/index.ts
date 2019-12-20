import { Server, Service, Context, Get, Request, Response } from '../src';
import { NotFoundError } from '../src/errors';
// import * as swagger from 'swagger-tools';
// import swaggerDocument from './swagger';

const responseTime = (req: Request, response: Response, next: any) => {
  const now = new Date().getTime();

  response.on('response', (e: any) => {
    // e.res.setHeader('X-Response-Time', new Date().getTime() - now);
    response.setHeader('X-Response-Time', new Date().getTime() - now);
  });

  return next();
};

class MyContext<B = {}, Q = {}> extends Context {
  public test: string;
  constructor(request: Request, response: Response) {
    super(request, response);

    this.test = 'BALLLLLLL';
  }
}

class TestService extends Service {
  public route = 'test';

  constructor(public hello = 'hello') {
    super();
  }

  public contextFactory(request: Request, response: Response) {
    return new MyContext(request, response);
  }

  @Get('/:id')
  public test(ctx: MyContext) {
    throw new NotFoundError('asdfasdfasdf');
    // throw new Error('asdfaskdjfhasd');
    ctx.send({ hello: this.hello + ctx.params.id });
  }
}

class MyService extends Server {
  public name = 'MyService';

  public middleware = [responseTime];

  // constructor() {
  //   super();

  //   // this.swaggerMiddleware();
  // }

  // private swaggerMiddleware() {
  //   swagger.initializeMiddleware(swaggerDocument, swag => {
  //     this.app.use(swag.swaggerMetadata());
  //     this.app.use(swag.swaggerValidator());
  //     this.app.use(swag.swaggerUi());
  //   });
  // }
}

const start = async () => {
  const serv = await MyService.create([TestService]);

  await serv.start(3000);
};

start();
