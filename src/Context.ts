import { Request, Response } from './interfaces';
import { Logger } from './Logger';
import { Logger as ILogger } from 'pino';
import { DefinedHttpError, InternalServerError } from 'restify-errors';

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

  public error<E extends DefinedHttpError>(error: E) {
    let err: any = error;

    if (!err.statusCode) {
      err = new InternalServerError(
        {
          cause: error,
        },
        err.message,
      );

      this.logger.error(err);
    } else {
      this.logger.info(error);
    }

    this.response.send(err.toJSON(), err.statusCode);
  }
}
