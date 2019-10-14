import * as pino from 'pino';

export const logLevel = (env: string) => {
  switch (env) {
    case 'test':
      return 'error';

    case 'development':
      return 'debug';

    default:
      return 'info';
  }
};

export const logger = pino({
  prettyPrint: true,
  level: logLevel(process.env.NODE_ENV),
});

type LoggerParams = { [key: string]: string };

export const Logger = (data: LoggerParams) => logger.child(data);
