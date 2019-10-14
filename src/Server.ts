import * as restana from 'restana';
import { Logger as ILogger } from 'pino';
import 'reflect-metadata';
import { Logger } from './Logger';
import * as bodyParser from 'body-parser';
import { Service } from './Service';
// @ts-ignore
import * as queryParser from 'connect-query';
import { ClassType, IRouteMetadaData, Request, Response } from './interfaces';

export abstract class Server {
  public name: string;
  public app: restana.Service<restana.Protocol.HTTP>;
  public logger: ILogger;
  public middleware: any[] = [];

  static async create<S extends Server>(
    this: ClassType<S>,
    services?: (new () => Service)[],
    ...args: any[]
  ) {
    const server = new this(...args);

    if (services) {
      server.registerServices(services);
    }

    server.registerMiddleware();

    await server.created();

    return server;
  }

  constructor() {
    this.app = restana();
    this.bootstrapApp();
  }

  public async stop() {
    return this.app.close();
  }

  private bootstrapApp() {
    this.logger = Logger({ name: this.name || 'Server' });

    this.app.use(bodyParser.json());
    this.app.use(queryParser());
  }

  public registerMiddleware() {
    if (!this.middleware.length) return;

    for (const middleware of this.middleware) {
      this.app.use(middleware);
    }
  }

  public async created(): Promise<void> {}
  public async started(): Promise<void> {}

  public async start(port: number) {
    const server = await this.app.start(port);

    this.logger.info({ port }, `${this.name} started and listening`);

    await this.started();

    return server;
  }

  public registerService<S extends Service>(
    serviceType: ClassType<S>,
    ...args: any[]
  ) {
    const service = new serviceType(...args);
    const serviceProtoType = Object.getPrototypeOf(service);

    const baseRoute = `/${service.route}`;
    const serviceRoutes = Object.getOwnPropertyNames(serviceProtoType);

    for (const serviceRoute of serviceRoutes) {
      const routeMetaData: IRouteMetadaData = Reflect.getOwnMetadata(
        serviceRoute,
        serviceProtoType,
      );

      if (!routeMetaData) continue;

      const { route } = routeMetaData;

      // @ts-ignore
      const routeHandler = service[serviceRoute].bind(service);

      const handler = async (request: Request, response: Response) => {
        // const context = new Context(request, response);
        const context = service.contextFactory(request, response);

        try {
          await routeHandler(context);
        } catch (error) {
          context.error(error);
        }
      };

      const routePath = `${baseRoute}${route.route}`.replace(/\/$/, '');

      this.app[route.method](routePath, handler);

      this.logger.info(
        {
          method: route.method.toUpperCase(),
          path: route.route,
          route: baseRoute,
        },
        'Route registered',
      );
    }

    this.logger.info({ baseRoute }, 'Service registered');
  }

  public registerServices<T extends Service>(services: ClassType<T>[]) {
    for (const service of services) {
      this.registerService(service);
    }
  }
}
