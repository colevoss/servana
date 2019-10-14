import { Server, Get, Service, Context } from '../src';
import { InternalError } from '../src/errors';
import axios from 'axios';

const PORT = 1112;

class TestServer extends Server {}

class TestService extends Service {
  public route = 'test';

  @Get()
  public test(ctx: Context) {
    ctx.send({ test: 'success' });
  }

  @Get('/other')
  public otherTest(ctx: Context) {
    ctx.send({ test: 'success' });
  }

  @Get('/fail')
  public fail() {
    throw new InternalError('FAIL');
  }
}

describe('.create', () => {
  it('Registers services if any are provided', async () => {
    const server = await TestServer.create([TestService]);

    await server.start(PORT);

    try {
      const { data } = await axios.get('http://localhost:1112/test');

      expect(data).toHaveProperty('test', 'success');
    } finally {
      await server.stop();
    }
  });

  it('Does not register services because none were provided', async () => {
    const server = await TestServer.create();

    await server.start(PORT);

    try {
      await axios.get('http://localhost:1112/test');
      fail('Shoul fail');
    } catch (e) {
      expect(true).toBeTruthy();
    } finally {
      await server.stop();
    }
  });
});

describe('registerService', () => {
  it('Should fail with an internal service error', async () => {
    const server = await TestServer.create([TestService]);

    await server.start(PORT);

    try {
      await axios.get('http://localhost:1112/test/fail');
      fail('Shoul fail');
    } catch (e) {
      expect(e.response.data).toHaveProperty('message', 'FAIL');
      expect(e.response.status).toBe(500);
    } finally {
      await server.stop();
    }
  });
});

describe('registerMiddleware', () => {
  const testFn = jest.fn();

  const middleware = (rep: any, req: any, next: Function) => {
    testFn();

    next();
  };

  class MiddlewareServer extends Server {
    public middleware = [middleware];
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Uses the middleware for all requests', async () => {
    const server = await MiddlewareServer.create([TestService]);
    await server.start(PORT);

    const getTest = axios.get('http://localhost:1112/test');
    const getOtherTest = axios.get('http://localhost:1112/test/other');

    await Promise.all([getTest, getOtherTest]);

    expect(testFn).toHaveBeenCalledTimes(2);

    await server.stop();
  });
});
