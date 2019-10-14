import { Request, Response } from './interfaces';
import { Logger } from './Logger';
import { Logger as ILogger } from 'pino';
import { DefinedHttpError } from 'restify-errors';

type IParams = { [key: string]: string };

export class Context<Body = {}, Query = {}> {
  public params: IParams;
  public body: Body;
  public query: Query;
  public logger: ILogger;

  constructor(public request: Request, public response: Response) {
    this.params = this.request.params as IParams;
    this.body = this.request.body as Body;
    this.query = this.request.query as Query;

    this.createLogger();
  }

  private createLogger() {
    const { url, method } = this.request;

    this.logger = Logger({ name: `${method} ${url}` });
  }

  public send<T>(data: T, code: number = 200) {
    this.response.send(data, code);

    this.logger.info(
      { data, code } as any,
      `Request success with code: ${code}`,
    );
  }

  // public error<E extends Error & { code?: string; statusCode?: number }>(
  public error<E extends DefinedHttpError>(error: E) {
    this.response.send(error.toJSON(), error.statusCode);

    this.logger.info(error);
  }
}
